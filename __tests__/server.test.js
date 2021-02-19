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
    expect(response.body.id).toEqual(1);
    expect(response.body.data.color).toEqual('White');
  });
  
  it('Should return a list of records using GET /food', async () => {
    const response = await request.get('/food');

    expect(response.status).toEqual(200);
    expect(response.body[0].type).toEqual('Dinner');
  });

  it('Should return a list of records using GET /clothes', async () => {
    const response = await request.get('/clothes');

    expect(response.status).toEqual(200);
    expect(response.body[0].data.name).toEqual('Socks');
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
    const response = await request.get('/clothes/1');

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.data.name).toEqual('Socks');
  });

  it('Should update specified record by request parameter on PUT /food', async () => {
    const response = await request.put('/food/1').send({
      name: 'Pizza',
      type: 'Anytime',
    });

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.data).toEqual({name: 'Pizza',type: 'Anytime'});
  });

  it('Should update specified record by request parameter on PUT /clothes', async () => {
    const response = await request.put('/clothes/1').send({
      name: 'T-Shirt',
      color: 'White',
    });

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.data).toEqual({name: 'T-Shirt',color: 'White'});
  });

  it('Should destroy specified record by request parameter on DELETE /food', async () => {
    const response = await request.delete('/food/1');

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.data).toEqual(null);
  });

  it('Should destroy specified record by request parameter on DELETE /clothes', async () => {
    const response = await request.delete('/clothes/1');

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.data).toEqual(null);
  });

});