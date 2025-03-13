const express = require('express')
const router = express.Router()
const {
  getAccommodations,
  getAccommodationById,
  addAccommodation,
  // updateAccommodation,
  deleteAccommodation
} = require('../controllers/accommodationControllers')

// Rutas CRUD
router.get('/accommodations', getAccommodations) // Obtener todos los alojamientos
router.get('/accommodations/:id', getAccommodationById) // Obtener un alojamiento por id etmfmfmfmf
router.post('/accommodations', addAccommodation) // Crear un nuevo alojamiento
// router.put('/accommodations/:id', updateAccommodation) // Actualizar un alojamiento
router.delete('/accommodations/:id', deleteAccommodation) // Eliminar un alojamiento

module.exports = router
