const { celebrate, Joi } = require('celebrate');
const isEmail = require('validator/lib/isEmail');

const validateLink = /^(https|http)?:\/\/(www.)?[^-_.\s](\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3})?(:\d+)?(.+[#a-zA-Z/:0-9]{1,})?\.(.+[#a-zA-Z/:0-9]{1,})?$/i;
const usersEmail = (valid) => isEmail(valid);

const validateSingnup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateSingnin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).unknown(true),
});

const validateUsersGet = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
});

const validateArticlesPost = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required(),
    image: Joi.string().required(),
  }),
});

const validateArticlesDel = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  validateSingnup,
  validateSingnin,
  validateUsersGet,
  validateArticlesPost,
  validateArticlesDel,
  validateLink,
  usersEmail,
};
