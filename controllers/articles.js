const Article = require('../models/article');

const { ErrorNotFound, ErrorForbidden } = require('../errors/index');
const {
  ARTICLE_NOT_FOUND, UNABLE_TO_CREATE_ARTICL, EMPTY_DATABASE, NOT_YOUR_ARTICLE,
} = require('../configs/constants');

module.exports.getAllArticles = (req, res, next) => {
  const { _id: owner } = req.user;
  Article.find({ owner })
    .then((articles) => {
      res.send({ data: articles });
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const { _id: owner } = req.user;
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword: keyword.trim(),
    title: title.trim(),
    text: text.trim(),
    source: source.trim(),
    link: link.trim(),
    image: image.trim(),
    owner,
    date,
  })
    .then((article) => {
      res.status(201).send({ data: article });
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  const { _id: owner } = req.user;
  const { articleId } = req.params;

  Article.removeIfIsOwner(owner, articleId)
    .then((article) => {
      res.send({ data: article });
    })
    .catch(next);
};
