const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const ErrorAuth = require('../errors/index');
const AUTH = require('../configs/constants');

const { NODE_ENV, JWT_SECRET } = require('../configs/secret');

const app = express();
app.use(cookieParser());

module.exports = (req, res, next) => {
  const cookie = req.cookies.jwt;
  if (!cookie) {
    return next(new ErrorAuth(AUTH));
  }
  let payload;

  try {
    payload = jwt.verify(cookie, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    req.user = payload;
  } catch (err) {
    return next(new ErrorAuth(AUTH));
  }
  return next();
};
