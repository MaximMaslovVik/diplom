const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const app = express();
const index = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT } = require('./secret');

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

app.use('/', index);

app.use(errors());
app.use(errorLogger);

app.listen(PORT, () => {});
