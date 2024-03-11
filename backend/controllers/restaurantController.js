const Restaurant = require("../models/restaurantModel");

const addRestaurant = async (req, res) => {
  try {
    const restauran = new Restaurant(req.body);
    const newRestauran = restauran.save()
    res.status(200).json({ newRestauran })
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
};

const getAllRestaurant = async (req, res) => {
  try {
    const restaurants = await Restaurant.find()
    const response = restaurants.map(restaurant => restaurant)
    res.status(200).json(restaurants)
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
}

const getRestaurant = async (req, res) => {
  const { _id } = req.params
  try {
    const restaurant = await Restaurant.findOne({ _id })
    res.status(200).json(restaurant)
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
};

const deleteRestaurant = (req, res) => {
  const { _id } = req.params;
  const restaurant = Restaurant.findByIdAndDelete({ _id })
    .then((response) => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ error: err.message })
    })
}
const putRestaurant = async (req, res) => {
  const { _id } = await req.params
  const { name, capacity, price, address, generalInformation } = await req.body
  try {
    const update = await Restaurant.updateOne(
      { _id },
      {
        name,
        capacity,
        price,
        address,
        generalInformation
      },
      { new: true }
    )
    res.status(201).json(update)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
const bookRestaurant = async (req, res) => {
  const { _id } = req.params
  const { book } = req.body;
  try {
    const ArrayBook = await Restaurant.findOne({ _id });
    const isBook = ArrayBook.bookArray.find(bookArr => bookArr === book)
    const restaurant = (isBook === undefined) && await Restaurant.updateOne(
      { _id },
      { $push: { bookArray: book } },
      { new: true }
    );
    res.status(200).json(isBook === undefined)
  } catch (err) {
    res.status(500).json({ isBook })
  }
}
const deleteBookRestaurant = async (req, res) => {
  const { _id } = req.params
  const { book } = req.body
  try {
    const deleteBook = await Restaurant.updateOne(
      { _id },
      { $pull: { bookArray: book } },
      { new: true })
    res.status(200).json(deleteBook)
  } catch (err) { 
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getAllRestaurant,
  addRestaurant,
  getRestaurant,
  deleteRestaurant,
  bookRestaurant,
  putRestaurant,
  bookRestaurant,
  deleteBookRestaurant
}