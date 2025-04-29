const express = require('express')
const router = express.Router()
const {
  getFavorites,
  getFavoriteById,
  addFavorite,
  deleteFavorite
} = require('../controllers/favouriteControllers')

router.get('/favourites/:userId', getFavorites) 
router.get('/favourites/:favId', getFavoriteById) 
router.post('/favourites', addFavorite) 
router.delete('/favourites/:favId', deleteFavorite) 

module.exports = router
