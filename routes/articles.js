const routerArticles = require('express').Router();

const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const celebrateCheck = require('../modules/celebrate-check');
const { createArticleValidator, deleteArticleValidator } = require('../Validator/validate');

routerArticles.get('/', getArticles);

routerArticles.post('/', celebrateCheck, createArticleValidator, createArticle);

routerArticles.delete('/', deleteArticleValidator, deleteArticle);

module.exports = routerArticles;
