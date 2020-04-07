const error = require('express').Router();
const NOT_FOUND = require('../configs/constants');

error.all('/*', (req, res) => {
  res.statusCode = 404;
  res.statusMessage = 'Error';
  res.send(NOT_FOUND);
});

module.exports = error;
