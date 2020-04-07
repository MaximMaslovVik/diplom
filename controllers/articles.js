const Article = require('../models/article');
const { NotFoundError, ForbiddenError } = require('../errors/index');

const {
  EMPTY_DATABASE, NOT_YOUR_ARTICLE, ARTICLE_NOT_FOUND,
} = require('../configs/constants');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .select('+owner')
    .then((articles) => {
      if (articles.length !== 0) {
        const data = articles.filter((item) => String(item.owner) === req.user._id);
        res.send({ articles: data });
      } else throw new NotFoundError(EMPTY_DATABASE);
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.status(201).send({ data: article }))
    .catch(next);
};


module.exports.deleteArticle = (req, res, next) => {
  const { _id } = req.user;
  const { articleId } = req.params;

  Article.findOne({ _id: articleId }).select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError(ARTICLE_NOT_FOUND);
      }
      return article;
    })
    .then((article) => {
      if (String(article.owner) === _id) {
        Article.findByIdAndRemove(articleId)
          .then((data) => res.send(data))
          .catch(next);
      } else {
        throw new ForbiddenError(NOT_YOUR_ARTICLE);
      }
    })
    .catch(next);
};
