const routerSignin = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/users');

routerSignin.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).unknown(true),
}), login);

module.exports = routerSignin;
