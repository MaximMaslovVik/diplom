const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const mongoose = require('mongoose');

const urls = require('./routes/routes');
/* const limiter = require('./routes/rateLimit'); */

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

require('dotenv').config();

const {
  PORT = 3000,
  MONGODB = 'mongodb://localhost:27017/news_api',
} = process.env;

mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
/* app.use(limiter);  */

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

app.listen(PORT, () => {});
