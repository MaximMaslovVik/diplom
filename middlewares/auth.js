const jwt = require('jsonwebtoken');
const { ErrorAuth } = require('../errors/index');
const { AUTH } = require('../configs/constants');
const { DB, SECRET_STRING } = require('../configs/secret');

const getAUTH = (req, res, next) => {
  const cookie = req.cookies.jwt;
  if (!cookie) {
    throw new ErrorAuth(AUTH);
  }
  let payload;

  try {
    payload = jwt.verify(cookie, DB, SECRET_STRING);
    req.user = payload;
  } catch (err) {
    throw new ErrorAuth(AUTH);
  }

  next();
};
module.exports = { getAUTH };
