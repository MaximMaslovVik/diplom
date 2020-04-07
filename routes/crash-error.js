const routerCrash = require('express').Router();
const SERVER_ERROR = require('../configs/constants');

routerCrash.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(SERVER_ERROR);
  }, 0);
});

module.exports = routerCrash;
