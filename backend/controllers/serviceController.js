const { sql } = require('../config/db')
const Service = require('../models/services')


async function getServices(req, res) {
  try {
    const pool = await sql.connect()
    const result = await pool.request().query('SELECT * FROM Service')

    const services = result.recordset.map(
      (row) => new Service(row.id, row.name, row.description, row.image)
    )

    res.json(services)
  } catch (error) {
    console.error('Error al obtener servicios:', error)
    res.status(500).json({ error: 'Error al obtener servicios' })
  }
}


async function getServiceById(req, res) {
  try {
    const { id } = req.params
    const pool = await sql.connect()
    const result = await pool
      .request()
      .input('id', sql.UniqueIdentifier, id)
      .query('SELECT * FROM Service WHERE id = @id')

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Servicio no encontrado' })
    }

    const service = new Service(
      result.recordset[0].id,
      result.recordset[0].name,
      result.recordset[0].description,
      result.recordset[0].image
    )

    res.json(service)
  } catch (error) {
    console.error('Error al obtener servicio:', error)
    res.status(500).json({ error: 'Error al obtener servicio' })
  }
}

async function addService(req, res) {
  try {
    const { name, description, image } = req.body
    const pool = await sql.connect()
    await pool
      .request()
      .input('name', sql.NVarChar, name)
      .input('description', sql.NVarChar, description)
      .input('image', sql.NVarChar, image)
      .query(
        'INSERT INTO Service (name, description, image) VALUES (@name, @description, @image)'
      )

    res.status(201).json({ message: 'Servicio creado correctamente' })
  } catch (error) {
    console.error('Error al agregar servicio:', error)
    res.status(500).json({ error: 'Error al agregar servicio' })
  }
}

async function updateService(req, res) {
  try {
    const { id } = req.params
    const { name, description, image } = req.body
    const pool = await sql.connect()
    const result = await pool
      .request()
      .input('id', sql.UniqueIdentifier, id)
      .input('name', sql.NVarChar, name)
      .input('description', sql.NVarChar, description)
      .input('image', sql.NVarChar, image)
      .query(
        'UPDATE Service SET name = @name, description = @description, image = @image WHERE id = @id'
      )

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Servicio no encontrado' })
    }

    res.json({ message: 'Servicio actualizado correctamente' })
  } catch (error) {
    console.error('Error al actualizar servicio:', error)
    res.status(500).json({ error: 'Error al actualizar servicio' })
  }
}


async function deleteService(req, res) {
  try {
    const { id } = req.params
    const pool = await sql.connect()
    const result = await pool
      .request()
      .input('id', sql.UniqueIdentifier, id)
      .query('DELETE FROM Service WHERE id = @id')

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Servicio no encontrado' })
    }

    res.json({ message: 'Servicio eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar servicio:', error)
    res.status(500).json({ error: 'Error al eliminar servicio' })
  }
}

module.exports = {
  getServices,
  getServiceById,
  addService,
  updateService,
  deleteService
}
