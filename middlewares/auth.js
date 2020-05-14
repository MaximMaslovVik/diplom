const jwt = require('jsonwebtoken');
const { ErrorAuth } = require('../errors/index');
const { AUTH } = require('../configs/constants');
const { SECRET_STRING } = require('../configs/secret');

const auth = (req, res, next) => {
 // console.log(req)
  const cookie = req.cookies.jwt;
  console.log (cookie);
  if (!cookie) {
    throw new ErrorAuth(AUTH);
  }
  let payload;

  try {
    payload = jwt.verify(cookie, SECRET_STRING);
    req.user = payload;
  } catch (err) {
    throw new ErrorAuth(AUTH);
  }

  next();
};
module.exports = auth;
