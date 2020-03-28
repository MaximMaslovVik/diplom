const mongoose = require('mongoose');
const Article = require('../models/article');

const { ObjectId } = mongoose.Types;

const ErrorNotFound = require('../errors/index');
const ErrorForbidden = require('../errors/index');
const NOT_FOUND = require('../configs/constants');
const BAD_REQUEST = require('../configs/constants');

module.exports.getAllArticles = (req, res, next) => {
  Article.find({})
    .then((article) => {
      if (article.length === 0) {
        throw new ErrorNotFound(NOT_FOUND);
      }
      return res.send({ data: article });
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.send({ data: article }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  if (!ObjectId.isValid(articleId)) {
    return (new ErrorNotFound(NOT_FOUND));
  }
  return Article.findById(req.params.articleId)
    .then((article) => {
      if (article) {
        if (article.owner.toString() === req.user._id) {
          Article.findByIdAndRemove(req.params.articleId)
            .then((articleRemove) => res.send({ remove: articleRemove }))
            .catch(next);
        } else {
          next(new ErrorForbidden(BAD_REQUEST));
        }
      } else {
        next(new ErrorNotFound(NOT_FOUND));
      }
    })
    .catch(next);
};
