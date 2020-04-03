const Article = require('../models/article');

const NotFoundError = require('../errors/index');
const { INVALID_REQUEST, EMPTY_DATABASE, NOT_FOUND } = require('../configs/constants');

module.exports.getAllArticles = (req, res, next) => {
  Article.find({})
    .then((article) => {
      if (article.length === 0) {
        throw new NotFoundError(EMPTY_DATABASE);
      }
      return res.send({ data: article });
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
    .catch(() => next(INVALID_REQUEST));
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
          next(new NotFoundError(EMPTY_DATABASE));
        }
      } else {
        next(new NotFoundError(NOT_FOUND));
      }
    })
    .catch(next);
};
