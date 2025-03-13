const express = require('express')

const router = express.Router()
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} = require('../controllers/userControllers') // Ajusta la ruta si es necesario

// Rutas de usuario
router.get('/users', getUsers) // Obtener todos los usuarios
router.post('/users/login', loginUser)
router.get('/users/:id', getUserById) // Obtener un usuario por ID
router.post('/users', createUser) // Crear un nuevo usuario
router.put('/users/:id', updateUser) // Actualizar un usuario
router.delete('/users/:id', deleteUser) // Eliminar un usuario

module.exports = router
