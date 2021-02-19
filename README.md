# Lab - 04: API Server

## Overview

I build a REST API using Express, by creating a proper series of endpoints that perform CRUD operations on a Mongo Database, using the REST standard.

## Author: William Moreno

## Collaboration

- Carly Dekock
- James Gerstenberger
- Jason Dormier
- Jason Quaglia
- Nick Magruder
- Seid Mohammed

## Deployment

The app is deployed on Heroku at the following link:

- [api-server](https://williammoreno-api-server.herokuapp.com/)

## Daily Pull Request

Work was accomplished on the `dev` branch. The pull request to merge the code into the `main` branch is here:

- [Pull Request](https://github.com/William-Moreno/api-server/pull/1)

Working features implemented:
- Creates 2 Mongo data models using Mongoose
- Created Collection Classes that accept Mongoose Models into the constructor
- Classes designed with methods to perform `create()`, `read()`, `update()` and `delete()`
- middleware including `logger.js` and `validator.js`
- error-handlers including `404.js` and `500.js`
- router modules created for both models
- `server.js` that utilizes router modules and `use()` them

## Tests

Test suite created that tests for:
  - 404 on bad route
  - 404 on bad method
  - Correct status codes and returned data for the following:
    - Create a record using POST
    - Read a list of records using GET
    - Read a desired record using GET
    - Update a record using PUT
    - Destroy a record using DELETE

All tests successfully passed.

## UML

UML drawing created with [limnu](https://limnu.com/)

![UML Diagram](./assets/lab-04-uml.PNG)