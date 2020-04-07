const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers } = require('../controllers/users');

routerUsers.get('/', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUsers);

module.exports = routerUsers;
