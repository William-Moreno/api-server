'use strict';

require('@code-fellows/supergoose');
const supertest = require('supertest');
const server = require('../src/server.js');
const request = supertest(server.app);

describe('Testing server routes', () => {
  it('should response with a 200 when hiting GET /food', async () => {

    const response = await request.get('/food');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  it ('should create a new person on POST /food', async () => {

    const response = await request.post('/food').send({
      name: 'Pizza',
      type: 'Dinner',
    });


    expect(response.status).toEqual(200);
    expect(response.body._id).toBeTruthy();
    expect(response.body.name).toEqual('Pizza');
  });
});