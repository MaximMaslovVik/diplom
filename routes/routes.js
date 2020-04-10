const express = require('express');

const app = express();

const routerSignin = require('./signin');
const routerSignup = require('./signup');
const { getAUTH } = require('../middlewares/auth');
const routerUsers = require('./users');
const routerArticles = require('./articles');
const errorRouter = require('./app');

app.use('/signin', routerSignin);
app.use('/signup', routerSignup);
app.use('/users/me', getAUTH, routerUsers);
app.use('/articles', getAUTH, routerArticles);

app.use('*', errorRouter);

module.exports = app;
