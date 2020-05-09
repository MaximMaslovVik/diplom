const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const mongoose = require('mongoose');

const urls = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const cors = require('cors');
const limiter = require('./modules/rateLimit');
const errorHandler = require('./middlewares/error-handler');
const { corsChecker } = require('./middlewares/cors');
const { SERVER_PORT, DEV_DB_HOST } = require('./configs/secret');

mongoose.connect(DEV_DB_HOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Модуль helmet поставляет автоматически заголовки безопасности
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// Подключаем rate-limiter
app.use(limiter);

// Подключаем логгер запросов
app.use(requestLogger);

app.use('/', urls);

app.use(errors());

app.use(errorLogger);

app.use(errorHandler);

app.listen(SERVER_PORT, () => {});
