const routerSignup = require('express').Router();
const { createUser } = require('../controllers/users');
const { postSingup } = require('../Validator/validate');

routerSignup.post('/', postSingup, createUser);

module.exports = routerSignup;
