'use strict';

require('@code-fellows/supergoose');
const supertest = require('supertest');
const server = require('../src/server.js');
const request = supertest(server.app);

describe('Server testing', () => {

  it('Should send a 404 on a bad route', async () => {
    const response = await request.get('/skateboard');

    expect(response.status).toEqual(404);
    expect(response.text).toEqual('Route not found');
  });

  it('Should send a 404 on a bad method', async () => {
    const response = await request.patch('/food/1');

    expect(response.status).toEqual(404);
    expect(response.text).toEqual('Route not found');
  });

  it('Should successfully create a food on POST /food', async () => {
    const response = await request.post('/food').send({
      name: 'Pizza',
      type: 'Dinner',
    });

    expect(response.status).toEqual(200);
    expect(response.body._id).toBeTruthy();
    expect(response.body.name).toEqual('Pizza');
  });

  it('Should successfully create clothes on POST /clothes', async () => {
    const response = await request.post('/clothes').send({
      name: 'Socks',
      color: 'White',
    });

    expect(response.status).toEqual(200);
    expect(response.body._id).toBeTruthy();
    expect(response.body.color).toEqual('White');
  });
  
  it('Should return a list of records using GET /food', async () => {
    const response = await request.get('/food');

    expect(response.status).toEqual(200);
    expect(response.body[0].type).toEqual('Dinner');
  });

  it('Should return a list of records using GET /clothes', async () => {
    const response = await request.get('/clothes');

    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('Socks');
  });

  it('Should return specified food by request parameter on GET /food/', async () => {
    const response = await request.post('/food').send({
      name: 'Waffles',
      type: 'Breakfast',
    });
    let foodTestId = response.body._id;

    const getResponse = await request.get(`/food/${foodTestId}`);

    expect(getResponse.status).toEqual(200);
    expect(getResponse.body[0]._id).toEqual(foodTestId);
    expect(getResponse.body[0].name).toEqual('Waffles');
  });

  it('Should return specified clothes by request parameter on GET /clothes', async () => {
    const response = await request.post('/clothes').send({
      name: 'Jacket',
      color: 'Red',
    });
    let clothesTestId = response.body._id;

    const getResponse = await request.get(`/clothes/${clothesTestId}`);

    expect(getResponse.status).toEqual(200);
    expect(getResponse.body[0]._id).toEqual(clothesTestId);
    expect(getResponse.body[0].name).toEqual('Jacket');
  });

  it('Should update specified record by request parameter on PUT /food', async () => {
    const response = await request.post('/food').send({
      name: 'PB&J',
      type: 'Lunch',
    });
    let foodTestId = response.body._id;

    const putResponse = await request.put(`/food/${foodTestId}`).send({
      name: 'Ice Cream',
      type: 'Dessert',
    });

    expect(putResponse.status).toEqual(200);
    expect(putResponse.body._id).toEqual(foodTestId);
    expect(putResponse.body.name).toEqual('Ice Cream');
  });

  it('Should update specified record by request parameter on PUT /clothes', async () => {
    const response = await request.post('/clothes').send({
      name: 'Hat',
      color: 'Blue',
    });
    let clothesTestId = response.body._id;

    const putResponse = await request.put(`/clothes/${clothesTestId}`).send({
      name: 'Pants',
      color: 'Black',
    });

    expect(putResponse.status).toEqual(200);
    expect(putResponse.body._id).toEqual(clothesTestId);
    expect(putResponse.body.color).toEqual('Black');
  });

  it('Should destroy specified record by request parameter on DELETE /food', async () => {
    const response = await request.post('/food').send({
      name: 'PB&J',
      type: 'Lunch',
    });
    let foodTestId = response.body._id;

    const deleteResponse = await request.delete(`/food/${foodTestId}`);

    console.log(deleteResponse.body);
    expect(deleteResponse.status).toEqual(200);
    // expect(deleteResponse.body.id).toEqual(1);
    expect(deleteResponse.body.name).toEqual('PB&J');
  });

  it('Should destroy specified record by request parameter on DELETE /clothes', async () => {
    const response = await request.post('/clothes').send({
      name: 'Gloves',
      color: 'White',
    });
    let clothesTestId = response.body._id;

    const deleteResponse = await request.delete(`/clothes/${clothesTestId}`);

    expect(deleteResponse.status).toEqual(200);
    // expect(deleteResponse.body.id).toEqual(1);
    expect(deleteResponse.body.name).toEqual('Gloves');
  });

});