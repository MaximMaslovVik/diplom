const routerUsers = require('express').Router();
const { getUsersValidator } = require('../Validator/validate');
const { getUsers } = require('../controllers/users');

routerUsers.get('/', getUsersValidator, getUsers);

module.exports = routerUsers;
