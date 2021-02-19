'use strict';

const express = require('express');
const router = express.Router();

const validator = require('../middleware/validator.js');

const ClothesInterface = require('../models/clothes-interface.js');
const ClothesModel = require('../models/clothes-model.js');
const clothesController = new ClothesInterface(ClothesModel);

router.get('/clothes', getClothes);
router.get('/clothes/:id', validator, getClothes);
router.post('/clothes', createClothes);
router.put('/clothes/:id', validator, updateClothes);
router.delete('/clothes/:id', validator, removeClothes);


async function getClothes(request, response, next) {
  
  const id = request.params.id;
  const closet = await clothesController.read(id);

  response.json(closet);
}

async function createClothes(request, response, next) {
  
  const clothesObj = request.body;
  const newClothes = await clothesController.create(clothesObj);

  response.json(newClothes);
}

async function updateClothes(request, response, next) {
  const id = parseInt(request.params.id);
  const clothesObject = request.body;
  let resObject = clothesController.update(id, clothesObject);
  response.json(resObject);
}

async function removeClothes(request, response, next) {
  const id = parseInt(request.params.id);
  let resObject = clothesController.delete(id);
  response.json(resObject);
}

module.exports = router;