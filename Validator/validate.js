const { celebrate, Joi } = require('celebrate');

const isEmail = require('validator/lib/isEmail');

const mongoIdRegExp = /^[0-9a-fA-F]{24}$/;
const validateLink = /^(https|http)?:\/\/(www.)?[^-_.\s](\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3})?(:\d+)?(.+[#a-zA-Z/:0-9]{1,})?\.(.+[#a-zA-Z/:0-9]{1,})?$/i;

const createArticleValidator = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required().min(2),
    text: Joi.string().required().min(2),
    date: Joi.date().required(),
    source: Joi.string().required(),
    link: Joi.string().required().pattern(validateLink),
    image: Joi.string().required().pattern(validateLink),
  }),
});

const deleteArticleValidator = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().pattern(mongoIdRegExp),
  }),
});

module.exports = {
  createArticleValidator,
  deleteArticleValidator,
  validateLink,
  isEmail,
};
