const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const mongoose = require('mongoose');
const urls = require('./routes/routes');
const errorHandler = require('./middlewares/error-handler');

const { SERVER_PORT } = require('./configs/secret');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const {
  MONGODB = 'mongodb://localhost:27017/news-api',
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

app.use(errorLogger);

app.use('/', urls);

app.use(errors());

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({ message: err.message });
  next();
});
app.use(errorHandler);
app.listen(SERVER_PORT, () => {});
