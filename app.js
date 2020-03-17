const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const app = express();

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT } = require('./secret');

const users = require('./routes/users');
const articles = require('./routes/articles');
const auth = require('./middlewares/auth');


mongoose.connect('mongodb://localhost:27017/news-apidb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(requestLogger);

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Что то пошло не так, загрузка сервера  прервана');
  }, 0);
});

app.use(auth);
app.use('/', users);
app.use('/', articles);

app.all('/*', (req, res) => res.status(404).send('Запрашиваемый ресурс не найден'));

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({ message: err.message || 'На сервере произошла ошибка' });
  next();
});

app.listen(PORT, () => {});
