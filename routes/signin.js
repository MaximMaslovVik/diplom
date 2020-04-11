const routerSignin = require('express').Router();
const { login } = require('../controllers/users');
const { postSingin } = require('../Validator/validate');

routerSignin.post('/', postSingin, login);

module.exports = routerSignin;
