const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ErrorNotFound = require('../errors/index');
const ErrorAuth = require('../errors/index');
const User = require('../models/user');

const { JWT_SECRET } = require('../configs/secret');
const BAD_REQUEST = require('../configs/constants');
const AUTH = require('../configs/constants');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  if (password.length > 9) {
    bcrypt.hash(password, 8)
      .then((hash) => User.create({
        name, email, password: hash,
      }))
      .then((user) => res.send({ data: user.omitPrivate() }))
      .catch(next);
  }
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((userId) => {
      if (!userId) {
        throw new ErrorNotFound(BAD_REQUEST);
      } else {
        res.send({ userId });
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 604800000,
          httpOnly: true,
          sameSite: true,
        })
        .send(token)
        .end();
    })
    .catch((err) => {
      if (err.message !== BAD_REQUEST) {
        return next(err);
      }
      return next(new ErrorAuth(AUTH));
    });
};
