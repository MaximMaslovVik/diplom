const errorRouter = require('express').Router();
const { ErrorNotFound } = require('../errors/index');
const { NOT_FOUND } = require('../configs/constants');

errorRouter.all(new ErrorNotFound(NOT_FOUND));

module.exports = errorRouter;
