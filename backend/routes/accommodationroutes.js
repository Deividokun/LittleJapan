const express = require('express')
const router = express.Router()
const {
  getAccommodations,
  getAccommodationById,
  addAccommodation,
  // updateAccommodation,
  deleteAccommodation
} = require('../controllers/accommodationControllers')


router.get('/accommodations', getAccommodations) 
router.get('/accommodations/:id', getAccommodationById) 
router.post('/accommodations', addAccommodation) 
// router.put('/accommodations/:id', updateAccommodation) // Actualizar un alojamiento
router.delete('/accommodations/:id', deleteAccommodation) 

module.exports = router
