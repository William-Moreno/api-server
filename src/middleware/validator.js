'use strict';

module.exports = function(request, response, next) {
  if(!parseInt(request.params.id)) {
    next('Missing or bad ID');
  } else {
    next();
  }
};