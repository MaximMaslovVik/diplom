const Article = require('../models/article');
const { NotFoundError, ForbiddenError } = require('../errors/index');

const {
  EMPTY_DATABASE, NOT_YOUR_ARTICLE, ARTICLE_NOT_FOUND,
} = require('../configs/constants');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .select('+owner')
    .then((articles) => {
      if (articles.length === 0) {
        throw new NotFoundError(EMPTY_DATABASE);
      }
      return res.send({ data: articless });
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const owner = req.user._id;
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.send({ data: article }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .then((article) => {
      if (article) {
        if (article.owner.toString() === req.user._id) {
          Article.findByIdAndRemove(req.params.articleId)
            .then((removeArticle) => res.send({ remove: removeArticle }))
            .catch(next);
        } else {
          next(new NotFoundError(ARTICLE_NOT_FOUND));
        }
      } else {
        next(new ForbiddenError(NOT_YOUR_ARTICLE));
      }
    })
    .catch(next);
};
