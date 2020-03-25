const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../configs/secret');
const ErrorAuth = require('../errors/index');
const { AUTH } = require('../configs/constants');

const app = express();
app.use(cookieParser());

module.exports = (req, res, next) => {
  const cookie = req.cookies.jwt;
  if (!cookie) {
    return next(new ErrorAuth(AUTH));
  }
  let payload;
  try {
    payload = jwt.verify(cookie, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    return next(new ErrorAuth(AUTH));
  }
  return next();
};
