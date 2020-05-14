const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');
const limiter = require('./modules/rateLimit');
const urls = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const errorHandler = require('./middlewares/error-handler');
const { SERVER_PORT, DEV_DB_HOST } = require('./configs/secret');

mongoose.connect(DEV_DB_HOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Модуль helmet поставляет автоматически заголовки безопасности
app.use(helmet());

const allowedCors = [
  'http://localhost:3000',
  'http://diplom-max.ml',
  'http://localhost:8080',
  'http://localhost:8081',
];

app.use(cors((req, cb) => {
  let corsOptions;
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    corsOptions = {
      origin,
      credentials: true,
      allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    };
  } else {
    corsOptions = { origin: false };
  }
  cb(null, corsOptions);
}));

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
