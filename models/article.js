const mongoose = require('mongoose');

const validate = /^(https|http)?:\/\/(www.)?[^-_.\s](\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3})?(:\d+)?(.+[#a-zA-Z/:0-9]{1,})?\.(.+[#a-zA-Z/:0-9]{1,})?$/i;

const cardSchema = new mongoose.Schema({
  keyword: { // ключевое слово, по которому статью нашли
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
  },
  title: { // заголовок статьи
    type: String,
    required: true,
  },
  text: { // текст статьи
    type: String,
    required: true,
  },
   date: {
    type: Date,
    default: Date.now,
  },
  source:{
    type: String,
     required: true,
  }
  link: { // ссылка на статью
    type: String,
    match: validate,
    required: true,
    isUrlValid: true,
  },
  image: { // ссылка на иллюстрацию к статье
    type: String,
    required: true,
    match: validate,
    isUrlValid: true,
  },
  owner: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],

});

module.exports = mongoose.model('card', cardSchema);
