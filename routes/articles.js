const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getAllArticles, createArticle, deleteArticle } = require('../controllers/articles');

router.get('/articles', getAllArticles);

router.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required(),
    image: Joi.string().required(),
  }),
}), createArticle);

router.delete('/articles/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
}), deleteArticle);


module.exports = router;
