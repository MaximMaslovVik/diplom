const jwt = require('jsonwebtoken');
const { ErrorAuth } = require('../errors/index');
const { AUTH } = require('../configs/constants');
const { NODE_ENV, JWT_SECRET } = require('../configs/secret');

module.exports = (req, res, next) => {
  const cookie = req.cookies.jwt;
  if (!cookie) {
    throw new ErrorAuth(AUTH);
  }
  let payload;

  try {
    payload = jwt.verify(cookie, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    req.user = payload;
  } catch (err) {
    throw new ErrorAuth(AUTH);
  }

  next();
};
