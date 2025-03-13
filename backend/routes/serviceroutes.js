const express = require('express')
const router = express.Router()
const {
  getServices,
  getServiceById,
  addService,
  updateService,
  deleteService
} = require('../controllers/serviceController')

// Rutas CRUD
router.get('/services', getServices) // Obtener todos los servicios
router.get('/services/:id', getServiceById) // Obtener un servicio por id
router.post('/services', addService) // Crear un nuevo servicio
router.put('/services/:id', updateService) // Actualizar un servicio
router.delete('/services/:id', deleteService) // Eliminar un servicio

module.exports = router
