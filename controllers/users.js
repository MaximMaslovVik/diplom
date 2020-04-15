const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { ErrorNotFound, ErrorAuth, ErrorConfict, ErrorReq } = require('../errors/index');
const {
  ITEM_NOT_FOUND, FAILED_CREATE_USER, INVALID_LINK, AUTH,
} = require('../configs/constants');
const { SECRET_STRING } = require('../configs/secret');
const User = require('../models/user');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  if (password.length > 9) {
    bcrypt.hash(password, 8)
      .then((hash) => User.create({
        name, email, password: hash,
      }))
      .then(() => res.send({ data: { name, email } }))
      .catch(() => next(new ErrorConfict(FAILED_CREATE_USER)));
  } else { next(new ErrorReq(INVALID_LINK)); }
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((userId) => {
      if (!userId) {
        throw new ErrorNotFound(ITEM_NOT_FOUND);
      } else {
        res.send({ userId });
      }
    })
    .catch(next);
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_STRING, { expiresIn: '7d' });
      /*
        process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret',
        */
      res.status(200).cookie('jwt', token, {
        maxAge: 604800000,
        httpOnly: true,
        sameSite: true,
      })
        .send(token)
        .end();
    })
    .catch(new ErrorAuth(AUTH));
};
