'use strict';

const express = require('express');
const router = express.Router();

const validator = require('../middleware/validator.js');

const ClothesInterface = require('../models/clothes.js');
const clothes = new ClothesInterface();

router.get('/clothes', getCloset);
router.get('/clothes/:id', validator, getClothesById);
router.post('/clothes', createClothes);
router.put('/clothes/:id', validator, updateClothes);
router.delete('/clothes/:id', validator, removeClothes);

function getCloset(request, response, next) {
  let resObject = clothes.read();
  response.json(resObject);
}

function getClothesById(request, response, next) {
  const id = parseInt(request.params.id);
  let resObject = clothes.read(id);
  response.json(resObject);
}

function createClothes(request, response, next) {
  const clothesObject = request.body;
  let resObject = clothes.create(clothesObject);
  response.json(resObject);
}

function updateClothes(request, response, next) {
  const id = parseInt(request.params.id);
  const clothesObject = request.body;
  let resObject = clothes.update(id, clothesObject);
  response.json(resObject);
}

function removeClothes(request, response, next) {
  const id = parseInt(request.params.id);
  let resObject = clothes.delete(id);
  response.json(resObject);
}

module.exports = router;