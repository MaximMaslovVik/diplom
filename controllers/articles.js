const Article = require('../models/article');

const { ErrorNotFound, ErrorForbidden } = require('../errors/index');
const {
  ARTICLE_NOT_FOUND, UNABLE_TO_CREATE_ARTICL, EMPTY_DATABASE, NOT_YOUR_ARTICLE,
} = require('../configs/constants');

module.exports.getAllArticles = (req, res, next) => {
  Article.find({})
    .then((article) => {
      if (article.length === 0) {
        throw new ErrorNotFound(EMPTY_DATABASE);
      }
      return res.send({ data: article });
    })
    .catch(next);
};

module.exports.createArticle = (req, res) => {
  const owner = req.user._id;
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.send({ data: article }))
    .catch(new ErrorNotFound(UNABLE_TO_CREATE_ARTICL));
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
          next(new ErrorForbidden(NOT_YOUR_ARTICLE));
        }
      } else {
        next(new ErrorForbidden(ARTICLE_NOT_FOUND));
      }
    })
    .catch(next);
};
