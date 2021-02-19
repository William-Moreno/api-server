'use strict';

const express = require('express');
const router = express.Router();

const validator = require('../middleware/validator.js');

const FoodInterface = require('../models/food-interface.js');
const FoodModel = require('../models/food-model.js');
const foodController = new FoodInterface(FoodModel);

router.get('/food', getFood);
router.get('/food/:id', validator, getFood);
router.post('/food', createFood);
router.put('/food/:id', validator, updateFood);
router.delete('/food/:id', validator, removeFood);


async function getFood(request, response, next) {
  
  const id = request.params.id;
  const foods = await foodController.read(id);

  response.json(foods);
}

async function createFood(request, response, next) {
  
  const foodObj = request.body;
  const newFood = await foodController.create(foodObj);

  response.json(newFood);
}

async function updateFood(request, response, next) {
  const id = request.params.id;
  const foodObject = request.body;
  let changeFood = await foodController.update(id, foodObject);
  response.json(changeFood);
}

async function removeFood(request, response, next) {
  const id = request.params.id;
  let eraseFood = await foodController.delete(id);
  response.json(eraseFood);
}

module.exports = router;