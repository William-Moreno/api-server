'use strict';

require('@code-fellows/supergoose');

const FoodInterface = require('../src/models/food-interface.js');
const foodModel = require('../src/models/food-model.js');

const controller = new FoodInterface(foodModel);

describe('testing the model controller', () => {
  it ('should be able to create a valid model', async () => {

    const newFood = await controller.create({name: 'test', type:'test'});

    expect(newFood.name).toEqual('test');
  });
});