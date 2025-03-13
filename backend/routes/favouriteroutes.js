const express = require('express')
const router = express.Router()
const {
  getFavorites,
  getFavoriteById,
  addFavorite,
  deleteFavorite
} = require('../controllers/favouriteControllers')

// Rutas CRUD
router.get('/favourites/:userId', getFavorites) // Obtener favoritos de un usuario
router.get('/favourites/:favId', getFavoriteById) // Obtener un favorito por ID
router.post('/favourites', addFavorite) // Agregar un favorito
router.delete('/favourites/:favId', deleteFavorite) // Eliminar un favorito

module.exports = router
