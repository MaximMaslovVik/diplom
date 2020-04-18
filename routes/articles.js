const router = require('express').Router();
const { validateArticlesPost, validateArticlesDel } = require('../configs/validate');
const { getAllArticles, createArticle, deleteArticle } = require('../controllers/articles');

const celebrateCheck = require('../modules/celebrate-check');

router.get('/articles', getAllArticles);

router.post('/articles', validateArticlesPost, createArticle);

router.delete('/articles/:articleId', validateArticlesDel, deleteArticle);

module.exports = router;
