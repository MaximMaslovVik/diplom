const express = require('express');
const helmet = require('helmet');

const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const urls = require('./routes/routes');

const errorHandler = require('./middlewares/error-handler');

const { SERVER_PORT, DEV_DB_HOST } = require('./configs/secret');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./routes/rateLimit');

mongoose.connect(DEV_DB_HOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
// Модуль helmet поставляет автоматически заголовки безопасности
app.use(helmet());

// Подключаем rate-limiter
app.use(limiter);

// Подключаем логгер запросов
app.use(requestLogger);


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/', urls);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(SERVER_PORT, () => {});
