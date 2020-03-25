const express = require('express').Router;

const app = express();
const auth = require('../middlewares/auth');
const { ErrorNotFound } = require('../errors/index');
const signin = require('./signin');
const signup = require('./signup');
const users = require('./users');
const articles = require('./articles');
const crashTest = require('./crash-error');
const { NOT_FOUND } = require('../configs/constants');

app.use('/', signin);
app.use('/', signup);
app.use('/', auth, users);
app.use('/', auth, articles);
app.use('/', crashTest);

app.use('*', (req, res, next) => next(ErrorNotFound(NOT_FOUND)));

module.exports = app;
