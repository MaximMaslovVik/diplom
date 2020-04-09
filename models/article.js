const mongoose = require('mongoose');

const validateLink = require('../Validator/validate');

const articleShema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    match: validateLink,
    required: true,
  },
  image: {
    type: String,
    match: validateLink,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    select: false,
    required: true,
  },
});

module.exports = mongoose.model('article', articleShema);
