const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/error-handler');

const app = express();
const index = require('./routes/routes');

const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(requestLogger);

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', index);


app.use(errors());
app.use(errorLogger);

app.use(errorHandler);
