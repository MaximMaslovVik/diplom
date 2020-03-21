const { celebrate, Joi } = require('celebrate');

const celebrateCheck = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
    link: Joi.string().required(),
  }),
  headers: Joi.object().keys({
    'content-type': 'application/json',
  }).unknown(),
});

module.exports = celebrateCheck;
