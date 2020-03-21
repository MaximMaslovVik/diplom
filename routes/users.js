const router = require('express').Router();
const { Joi } = require('celebrate');
const { getUser } = require('../controllers/users');

const celebrateCheck = require('../modules/celebrate-check');

router.get('/users/:userId', celebrateCheck({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUser);

module.exports = router;
