const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../configs/secret');
const ErrorAuth = require('../errors/error_Auth');

const app = express();
app.use(cookieParser());

module.exports = (req, res, next) => {
  const cookie = req.cookies.jwt;
  if (!cookie) {
    return next(new ErrorAuth('Доступ запрещен. Необходима авторизация'));
  }
  let payload;
  try {
    payload = jwt.verify(cookie, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    return next(new ErrorAuth('Доступ запрещен. Необходима авторизация'));
  }
  return next();
};
