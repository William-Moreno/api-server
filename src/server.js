'use strict';

const express = require('express');
const app = express();

const error404 = require('./error-handlers/404.js');
const error500 = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');

const foodRouter = require('./routes/food.js');
const clothesRouter = require('./routes/clothes.js');

app.use(express.json());
app.use(logger);
app.use(foodRouter);
app.use(clothesRouter);

app.use('*', error404);
app.use(error500);

module.exports = {
  app: app,
  start: function(port) {
    app.listen(port, () => {
      console.log(`App is up on PORT :: ${port}`);
    });
  },
};