const express = require('express')
const router = express.Router()

const {
  getReserves,
  getReserveById,
  addReserve,
  updateReserve,
  deleteReserve
} = require('../controllers/reserveController')


router.get('/reserves', getReserves) 
router.get('/reserves/:id', getReserveById) 
router.post('/reserves', addReserve) 
router.put('/reserves/:id', updateReserve) 
router.delete('/reserves/:id', deleteReserve) 

module.exports = router
