const express = require('express').Router;

const app = express();
const auth = require('../middlewares/auth');
const { ErrorNotFound } = require('../errors/index');
const signin = require('./signin');
const signup = require('./signup');
const users = require('./users');
const articles = require('./articles');
const crashTest = require('./crash-error');
const NOT_FOUND = require('../configs/constants');
const celebrateCheck = require('../modules/celebrate-check');

crashTest.get('/', crashTest);
signin.post('/', signin);
signup.post('/', celebrateCheck, signup);

app.use('/users', celebrateCheck, auth, users);
app.use('/articles', celebrateCheck, auth, articles);


app.use('*', (req, res, next) => next(ErrorNotFound(NOT_FOUND)));

module.exports = app;
