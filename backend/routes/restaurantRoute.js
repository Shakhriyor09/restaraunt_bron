const express = require('express')
const {
  getAllRestaurant,
  addRestaurant,
  getRestaurant,
  putRestaurant,
  deleteRestaurant,
  bookRestaurant,
  deleteBookRestaurant } = require('../controllers/restaurantController')
  
const router = express.Router()

router.get('/', getAllRestaurant)
router.get('/:_id', getRestaurant)

router.put('/:_id', putRestaurant)
router.put('/book/:_id', bookRestaurant)
router.put('/delete/:_id', deleteBookRestaurant)

router.delete('/:_id', deleteRestaurant)

router.post('/add', addRestaurant)

module.exports = router