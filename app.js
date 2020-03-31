const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/error-handler');

const mongoose = require('mongoose');

const app = express();
const index = require('./routes/routes');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  MONGODB = 'mongodb://localhost:27017/news_api',
} = process.env;

mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(requestLogger);

app.use('/', index);


app.use(errors());
app.use(errorLogger);

app.use(errorHandler);
