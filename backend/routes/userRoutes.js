const express = require('express')

const router = express.Router()
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} = require('../controllers/userControllers') 


router.get('/users', getUsers) 
router.post('/users/login', loginUser)
router.get('/users/:id', getUserById)
router.post('/users', createUser) 
router.put('/users/:id', updateUser) 
router.delete('/users/:id', deleteUser) 

module.exports = router
