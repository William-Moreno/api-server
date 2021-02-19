'use strict';

const express = require('express');
const router = express.Router();

const validator = require('../middleware/validator.js');

const FoodInterface = require('../models/food.js');
const food = new FoodInterface();

router.get('/food', getFoods);
router.get('/food/:id', validator, getFoodById);
router.post('/food', createFood);
router.put('/food/:id', validator, updateFood);
router.delete('/food/:id', validator, removeFood);

function getFoods(request, response, next) {
  let resObject = food.read();
  response.json(resObject);
}

function getFoodById(request, response, next) {
  const id = parseInt(request.params.id);
  let resObject = food.read(id);
  response.json(resObject);
}

function createFood(request, response, next) {
  const foodObject = request.body;
  let resObject = food.create(foodObject);
  response.json(resObject);
}

function updateFood(request, response, next) {
  const id = parseInt(request.params.id);
  const foodObject = request.body;
  let resObject = food.update(id, foodObject);
  response.json(resObject);
}

function removeFood(request, response, next) {
  const id = parseInt(request.params.id);
  let resObject = food.delete(id);
  response.json(resObject);
}

module.exports = router;