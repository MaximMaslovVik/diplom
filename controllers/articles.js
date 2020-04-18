const Article = require('../models/article');

const { ErrorNotFound, ErrorForbidden } = require('../errors/index');
const {
  ARTICLE_NOT_FOUND, ARTICLE_DELETED, NOT_YOUR_ARTICLE,
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

module.exports.deleteArticle = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { articleId } = req.params;

  try {
    const article = await Article.findById(articleId).select('+ owner');
    if (!article) {
      return next(new ErrorNotFound(ARTICLE_NOT_FOUND));
    }

    if (article.owner._id.toString() !== owner) {
      return next(new ErrorForbidden(NOT_YOUR_ARTICLE));
    }

    await article.remove();
    return res.status(200).send(ARTICLE_DELETED);
  } catch (err) {
    return next(err);
  }
};
