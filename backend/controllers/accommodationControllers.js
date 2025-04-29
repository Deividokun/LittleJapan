const { sql } = require('../config/db')
const Accommodation = require('../models/accommodation')
const User = require('../models/User')

async function getAccommodations(req, res) {
  try {
    const { tipoAlojamiento, ciudad, precio, huespedes } = req.query 

    let query = `
      SELECT
        A.id, A.type, A.guests, A.city, A.pricePerNight,
        A.image, A.name, A.description,
        U.id AS userId, U.name AS userName, U.experience, U.rating,
        U.image AS userImage, U.document_number, U.telephone_number, U.age,
        U.Email AS email, U.FullName AS fullName,
        S.id AS serviceId, S.name AS serviceName, S.description AS serviceDescription, S.image AS serviceImage
      FROM Accommodation A
      JOIN [Users] U ON A.ownerId = U.id
      LEFT JOIN Accommodation_Services AS ASR ON A.id = ASR.accommodation_id
      LEFT JOIN Service S ON ASR.service_id = S.id 
    `

    const filters = [] 
    const params = []

    if (tipoAlojamiento) {
      filters.push(`LOWER(A.type) = LOWER(@tipoAlojamiento)`)
      params.push({
        name: 'tipoAlojamiento',
        type: sql.VarChar,
        value: tipoAlojamiento
      })
    }

    if (ciudad) {
      filters.push(`LOWER(A.city) = LOWER(@ciudad)`)
      params.push({ name: 'ciudad', type: sql.VarChar, value: ciudad })
    }

    if (precio) {
      filters.push(`A.pricePerNight <= @precio`)
      params.push({ name: 'precio', type: sql.Int, value: precio })
    }

    if (huespedes) {
      filters.push(`A.guests >= @huespedes`)
      params.push({ name: 'huespedes', type: sql.Int, value: huespedes })
    }

    if (filters.length > 0) {
      query += ` WHERE ${filters.join(' AND ')}`
    }

    const pool = await sql.connect() 
    const request = pool.request() 

    params.forEach((param) => {
      request.input(param.name, param.type, param.value)
    })

    const result = await request.query(query)

    
    const accommodationMap = new Map() 

    result.recordset.forEach((row) => {
    
      if (!accommodationMap.has(row.id)) {
        accommodationMap.set(row.id, {
          id: row.id,
          type: row.type,
          owner: {
            id: row.userId,
            name: row.userName,
            experience: row.experience,
            rating: row.rating,
            image: row.userImage,
            document_number: row.document_number,
            telephone_number: row.telephone_number,
            age: row.age,
            email: row.email,
            fullName: row.fullName
          },
          guests: row.guests,
          city: row.city,
          pricePerNight: row.pricePerNight,
          image: row.image,
          name: row.name,
          description: row.description,
          services: []
        })
      }

      if (row.serviceId) {
        accommodationMap.get(row.id).services.push({
          id: row.serviceId,
          name: row.serviceName,
          description: row.serviceDescription,
          image: row.serviceImage
        })
      }
    })

    res.json(Array.from(accommodationMap.values()))
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}


async function getAccommodationById(req, res) {
  try {
    const { id } = req.params
    const pool = await sql.connect()
    const result = await pool.request().input('id', sql.UniqueIdentifier, id)
      .query(`
        SELECT 
          A.id, A.type, A.guests, A.city, A.pricePerNight, 
          A.image, A.name, A.description,
          U.id AS userId, U.name AS userName, U.experience, U.password, U.rating, 
          U.image AS userImage, U.document_number, U.telephone_number, U.age, 
          U.Email, U.FullName,
          S.id AS serviceId, S.name AS serviceName, S.description AS serviceDescription, S.image AS serviceImage
        FROM Accommodation A
        JOIN [Users] U ON A.ownerId = U.id
        LEFT JOIN Accommodation_Services AS ASR ON A.id = ASR.accommodation_id
        LEFT JOIN Service S ON ASR.service_id = S.id
        WHERE A.id = @id
      `)

    if (result.recordset.length === 0) {
      return res.status(404).send('Alojamiento no encontrado')
    }

    const row = result.recordset[0]
    const owner = new User({
      id: row.userId,
      name: row.userName,
      experience: row.experience,
      password: row.password,
      rating: row.rating,
      image: row.userImage,
      document_number: row.document_number,
      telephone_number: row.telephone_number,
      age: row.age,
      Email: row.Email,
      FullName: row.FullName
    })

    const accommodation = new Accommodation(
      row.id,
      row.type,
      owner,
      row.guests,
      row.city,
      row.pricePerNight,
      row.image,
      row.name,
      row.description,
      [] 
    )

    result.recordset.forEach((row) => {
      if (row.serviceId) {
        accommodation.services.push({
          id: row.serviceId,
          name: row.serviceName,
          description: row.serviceDescription,
          image: row.serviceImage
        })
      }
    })

    res.json(accommodation)
  } catch (error) {
    console.error('Error al obtener alojamiento:', error)
    res.status(500).send('Error al obtener alojamiento')
  }
}


async function addAccommodation(req, res) {
  const {
    type,
    ownerid,
    guests,
    city,
    pricepernight,
    image,
    name,
    description,
    services
  } = req.body

  if (
    !type ||
    !ownerid ||
    !guests ||
    !city ||
    !pricepernight ||
    !image ||
    !name ||
    !description
  ) {
    return res.status(400).send('Faltan datos requeridos')
  }

  try {
    const pool = await sql.connect()

    
    const transaction = new sql.Transaction(pool)
    await transaction.begin()

    try {
      
      const result = await transaction
        .request()
        .input('type', sql.NVarChar, type)
        .input('ownerid', sql.UniqueIdentifier, ownerid)
        .input('guests', sql.Int, guests)
        .input('city', sql.NVarChar, city)
        .input('pricepernight', sql.Float, pricepernight)
        .input('image', sql.NVarChar, image)
        .input('name', sql.NVarChar, name)
        .input('description', sql.NVarChar, description)
        .query(
          'INSERT INTO Accommodation (type, ownerid, guests, city, pricepernight, image, name, description) OUTPUT INSERTED.id VALUES (@type, @ownerid, @guests, @city, @pricepernight, @image, @name, @description)'
        )

      const accommodationId = result.recordset[0].id 

  
      if (services && services.length > 0) {
        for (const serviceId of services) {
          
          if (!isValidUUID(serviceId)) {
            return res.status(400).send(`ID de servicio inválido: ${serviceId}`)
          }

          await transaction
            .request()
            .input('accommodationId', sql.UniqueIdentifier, accommodationId)
            .input('serviceId', sql.UniqueIdentifier, serviceId) 
            .query(
              'INSERT INTO Accommodation_Services (accommodation_id, service_id) VALUES (@accommodationId, @serviceId)'
            )
        }
      }

    
      function isValidUUID(uuid) {
        const regex =
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
        return regex.test(uuid)
      }

      
      await transaction.commit()

      res.status(201).send('Alojamiento creado correctamente')
    } catch (error) {
      
      await transaction.rollback()
      console.error('Error al agregar alojamiento:', error)
      res.status(500).send('Error al agregar alojamiento')
    }
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error)
    res.status(500).send('Error de conexión a la base de datos')
  }
}


async function deleteAccommodation(req, res) {
  try {
    const { id } = req.params
    const pool = await sql.connect()
    const result = await pool
      .request()
      .input('id', sql.UniqueIdentifier, id)
      .query('DELETE FROM Accommodation WHERE id = @id')

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send('Alojamiento no encontrado')
    }

    res.send('Alojamiento eliminado correctamente')
  } catch (error) {
    console.error('Error al eliminar alojamiento:', error)
    res.status(500).send('Error al eliminar alojamiento')
  }
}

module.exports = {
  getAccommodations,
  getAccommodationById,
  addAccommodation,
  // updateAccommodation,
  deleteAccommodation
}
