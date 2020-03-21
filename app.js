const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/error-handler');

const app = express();
const index = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT } = require('./configs/secret');

app.use(requestLogger);

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', index);
app.use(errorHandler);

app.use(errors());
app.use(errorLogger);

app.listen(PORT, () => {});
