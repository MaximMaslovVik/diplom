const Article = require('../models/article');

const NotFoundError = require('../errors/index');
const SERVER_ERROR = require('../configs/constants');
const NOT_FOUND = require('../configs/secret');

module.exports.getAllArticles = (req, res) => {
  Article.find({})
    .then((article) => {
      if (article.length === 0) {
        throw new NotFoundError('База данных карточек пуста!');
      }
      return res.send({ data: article });
    })
    .catch((error) => res.status(500).send({ message: error.message }));
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
    .catch(() => res.status(500).send({ message: 'Не удается создать карточку' }));
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
          next(new NotFoundError('NOT_FOUND'));
        }
      } else {
        next(new NotFoundError(NOT_FOUND));
      }
    })
    .catch(() => res.status(500).send({ SERVER_ERROR }));
};
