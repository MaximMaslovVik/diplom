const jwt = require('jsonwebtoken');

const NotFoundError = require('../errors/error-notFound');
require('dotenv').config();
const AUTH = require('../configs/constants');

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = (req, res, next) => {
  const cookie = req.cookies.jwt;
  if (!cookie) {
    throw new NotFoundError(AUTH);
  }
  let payload;

  try {
    payload = jwt.verify(cookie, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    req.user = payload;
  } catch (err) {
    throw new NotFoundError(AUTH);
  }

  next();
};
