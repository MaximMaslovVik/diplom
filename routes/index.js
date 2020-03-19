const express = require('express');

const app = express();
const auth = require('../middlewares/auth');

const signin = require('./signin');
const signup = require('./signup');
const users = require('./users');
const articles = require('./articles');
const crashTest = require('./crash-error');

app.use('/', signin);
app.use('/', signup);
app.use('/', auth, users);
app.use('/', auth, articles);
app.use('/', crashTest);

app.all('/*', (req, res) => res.status(404).send('Запрашиваемый ресурс не найден'));

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({ message: err.message || 'На сервере произошла ошибка' });
  next();
});

module.exports = app;
