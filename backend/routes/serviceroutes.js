const express = require('express')
const router = express.Router()
const {
  getServices,
  getServiceById,
  addService,
  updateService,
  deleteService
} = require('../controllers/serviceController')


router.get('/services', getServices)
router.get('/services/:id', getServiceById) 
router.post('/services', addService) 
router.put('/services/:id', updateService) 
router.delete('/services/:id', deleteService) 

module.exports = router
