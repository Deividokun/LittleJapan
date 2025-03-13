const { sql } = require('../config/db')
const User = require('../models/User')
const Accommodation = require('../models/accommodation')
const Reservation = require('../models/reserves')

// Función para obtener todas las reservas con los datos completos
async function getReserves(req, res) {
  try {
    const pool = await sql.connect()

    // Consulta SQL corregida
    const query = `
      SELECT 
        r.id AS reserveId,
        r.price,
        r.startDate,
        r.endDate,
        r.usersid,
        r.accommodationid,
        u.id AS userId,
        u.name AS userName,
        u.experience AS userExperience,
        u.rating AS userRating,
        u.image AS userImage,
        u.document_number AS userDocumentNumber,
        u.telephone_number AS userTelephoneNumber,
        u.age AS userAge,
        u.email AS userEmail,
        u.fullName AS userFullName,
        a.id AS accommodationId,
        a.type AS accommodationType,
        a.guests AS accommodationGuests,
        a.city AS accommodationCity,
        a.pricePerNight AS accommodationPricePerNight,
        a.image AS accommodationImage,
        a.name AS accommodationName,
        a.description AS accommodationDescription,
        s.id AS serviceId,
        s.name AS serviceName,
        s.description AS serviceDescription,
        s.image AS serviceImage
      FROM Reserve r
      JOIN [Users] u ON r.usersid = u.id
      JOIN Accommodation a ON r.accommodationid = a.id
      LEFT JOIN Accommodation_Services AS ASR ON a.id = ASR.accommodation_id
      LEFT JOIN Service s ON ASR.service_id = s.id
    `

    const result = await pool.request().query(query)

    // Mapa para organizar reservas sin duplicar
    const reservesMap = new Map()

    result.recordset.forEach((row) => {
      if (!reservesMap.has(row.reserveId)) {
        const user = new User({
          id: row.userId,
          name: row.userName,
          experience: row.userExperience,
          rating: row.userRating,
          image: row.userImage,
          document_number: row.userDocumentNumber,
          telephone_number: row.userTelephoneNumber,
          age: row.userAge,
          email: row.userEmail,
          fullName: row.userFullName
        })

        const accommodation = new Accommodation(
          row.accommodationId,
          row.accommodationType,
          user, // Relación con usuario
          row.accommodationGuests,
          row.accommodationCity,
          row.accommodationPricePerNight,
          row.accommodationImage,
          row.accommodationName,
          row.accommodationDescription,
          [] // Array vacío para agregar servicios
        )

        reservesMap.set(
          row.reserveId,
          new Reservation(
            row.reserveId,
            row.price,
            new Date(row.startDate),
            new Date(row.endDate),
            user,
            accommodation
          )
        )
      }

      // Agregar servicios al alojamiento si existen
      if (row.serviceId) {
        reservesMap.get(row.reserveId).accommodation.services.push({
          id: row.serviceId,
          name: row.serviceName,
          description: row.serviceDescription,
          image: row.serviceImage
        })
      }
    })

    // Enviar las reservas como respuesta
    res.json(Array.from(reservesMap.values()))
  } catch (error) {
    console.error('Error al obtener reservas:', error)
    res.status(500).send('Error al obtener reservas')
  }
}

// Función para obtener una reserva por su id (uniqueidentifier)
const getReserveById = async (req, res) => {
  try {
    const { id } = req.params

    console.log('ID recibido:', id) // <-- Verifica qué se está recibiendo

    if (!id) {
      return res.status(400).json({ error: 'ID no proporcionado' })
    }

    const guidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    if (!guidRegex.test(id)) {
      return res
        .status(400)
        .json({ error: 'ID inválido. Debe ser un GUID válido.' })
    }

    const pool = await sql.connect()
    const result = await pool
      .request()
      .input('id', sql.UniqueIdentifier, id) // <-- Aquí es donde fallaría si el ID no es válido
      .query('SELECT * FROM Reserve WHERE id = @id')

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' })
    }

    res.json(result.recordset[0])
  } catch (error) {
    console.error('Error al obtener reserva:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

// Función para agregar una nueva reserva
// Función para agregar una nueva reserva con validaciones
async function addReserve(req, res) {
  try {
    const { price, startDate, endDate, usersid, accommodationid } = req.body

    if (!price || !startDate || !endDate || !usersid || !accommodationid) {
      return res
        .status(400)
        .json({ error: 'Todos los campos son obligatorios' })
    }

    // Convertir fechas a formato YYYY-MM-DD
    const formattedStartDate = new Date(startDate).toISOString().split('T')[0]
    const formattedEndDate = new Date(endDate).toISOString().split('T')[0]

    const pool = await sql.connect()

    // Verificar si el usuario y el alojamiento existen
    const userResult = await pool
      .request()
      .input('usersid', sql.UniqueIdentifier, usersid)
      .query('SELECT id FROM [Users] WHERE id = @usersid')

    const accommodationResult = await pool
      .request()
      .input('accommodationid', sql.UniqueIdentifier, accommodationid)
      .query('SELECT id FROM Accommodation WHERE id = @accommodationid')

    if (userResult.recordset.length === 0) {
      return res.status(404).json({ error: 'El usuario no existe' })
    }

    if (accommodationResult.recordset.length === 0) {
      return res.status(404).json({ error: 'El alojamiento no existe' })
    }

    // Verificar disponibilidad
    const existingReservation = await pool
      .request()
      .input('accommodationid', sql.UniqueIdentifier, accommodationid)
      .input('startDate', sql.Date, formattedStartDate)
      .input('endDate', sql.Date, formattedEndDate).query(`
        SELECT id FROM Reserve 
        WHERE accommodationid = @accommodationid 
        AND (
          (startDate <= @endDate AND endDate >= @startDate)
        )
      `)

    if (existingReservation.recordset.length > 0) {
      return res
        .status(400)
        .json({ error: 'El alojamiento ya está reservado en esas fechas' })
    }

    // Insertar la reserva
    await pool
      .request()
      .input('price', sql.Float, price)
      .input('startDate', sql.Date, formattedStartDate)
      .input('endDate', sql.Date, formattedEndDate)
      .input('usersid', sql.UniqueIdentifier, usersid)
      .input('accommodationid', sql.UniqueIdentifier, accommodationid)
      .query(
        `INSERT INTO Reserve (price, startDate, endDate, usersid, accommodationid) 
         VALUES (@price, @startDate, @endDate, @usersid, @accommodationid)`
      )

    res.status(201).json({ message: 'Reserva creada correctamente' })
  } catch (error) {
    console.error('Error al agregar reserva:', error)
    res.status(500).json({ error: 'Error al agregar reserva' })
  }
}
// Función para actualizar una reserva
async function updateReserve(req, res) {
  try {
    const { id } = req.params
    const { price, startDate, endDate, usersid, accommodationid } = req.body
    const pool = await sql.connect()
    const result = await pool
      .request()
      .input('id', sql.UniqueIdentifier, id)
      .input('price', sql.Float, price)
      .input('startDate', sql.Date, startDate)
      .input('endDate', sql.Date, endDate)
      .input('usersid', sql.UniqueIdentifier, usersid)
      .input('accommodationid', sql.UniqueIdentifier, accommodationid)
      .query(
        'UPDATE Reserve SET price = @price, startDate = @startDate, endDate = @endDate, usersid = @usersid, accommodationid = @accommodationid WHERE id = @id'
      )

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send('Reserva no encontrada')
    }

    res.send('Reserva actualizada correctamente')
  } catch (error) {
    console.error('Error al actualizar reserva:', error)
    res.status(500).send('Error al actualizar reserva')
  }
}

// Función para eliminar una reserva
async function deleteReserve(req, res) {
  try {
    const { id } = req.params
    const pool = await sql.connect()
    const result = await pool
      .request()
      .input('id', sql.UniqueIdentifier, id)
      .query('DELETE FROM Reserve WHERE id = @id')

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send('Reserva no encontrada')
    }

    res.send('Reserva eliminada correctamente')
  } catch (error) {
    console.error('Error al eliminar reserva:', error)
    res.status(500).send('Error al eliminar reserva')
  }
}

module.exports = {
  getReserves,
  getReserveById,
  addReserve,
  updateReserve,
  deleteReserve
}
