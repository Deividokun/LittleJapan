const express = require('express')
const router = express.Router()

const {
  getReserves,
  getReserveById,
  addReserve,
  updateReserve,
  deleteReserve
} = require('../controllers/reserveController')

// Rutas CRUD
router.get('/reserves', getReserves) // Obtener todas las reservas
router.get('/reserves/:id', getReserveById) // Obtener una reserva por id
router.post('/reserves', addReserve) // Crear una nueva reserva
router.put('/reserves/:id', updateReserve) // Actualizar una reserva
router.delete('/reserves/:id', deleteReserve) // Eliminar una reserva

module.exports = router
