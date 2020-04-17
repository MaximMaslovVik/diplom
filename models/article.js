const mongoose = require('mongoose');

const { validateLink } = require('../configs/validate');

const { ErrorForbidden, ErrorNotFound } = require('../errors/index');
const { ARTICLE_NOT_FOUND, UNABLE_TO_CREATE_ARTICLE, INVALID_LINK } = require('../configs/constants');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
  },
  text: {
    type: String,
    required: true,
    minlength: 2,
  },
  date: {
    type: Date,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: [validateLink, INVALID_LINK],
  },
  image: {
    type: String,
    required: true,
    validate: [validateLink, INVALID_LINK],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

articleSchema.statics.removeIfIsOwner = function (owner, articleId) {
  return this.findById(articleId)
    .select('+owner')
    .then((article) => {
      if (!article) {
        return Promise.reject(new ErrorNotFound(ARTICLE_NOT_FOUND));
      }

      if (article.owner._id.toString() === owner) {
        return article.remove();
      }

      return Promise.reject(new ErrorForbidden(UNABLE_TO_CREATE_ARTICLE));
    });
};

module.exports = mongoose.model('article', articleSchema);

/*
*/
