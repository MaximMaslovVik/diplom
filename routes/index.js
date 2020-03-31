const express = require('express');

const app = express();
const auth = require('../middlewares/auth');

const signin = require('./signin');
const signup = require('./signup');
const users = require('./users');
const articles = require('./articles');
const errorApp = require('./app');
const crashTest = require('./crash-text');

app.use('/', signin);
app.use('/', signup);
app.use('/', auth, users);
app.use('/', auth, articles);
app.use('/', errorApp);
app.use('/', crashTest);


module.exports = app;
