const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { NotFoundError, ErrorAuth } = require('../errors/index');
const User = require('../models/user');
const { ERROR_EMAIL_PASS, INVALID_REQUEST } = require('../configs/constants');
const { JWT_SECRET } = require('../configs/secret');

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (password.length > 11) {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name, about, avatar, email, password: hash,
      }))
      .then((user) => res.send({ data: user.omitPrivate() }))
      .catch(next);
  }
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((userId) => {
      if (!userId) {
        throw new NotFoundError(INVALID_REQUEST);
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
      if (err.message !== ERROR_EMAIL_PASS) {
        return next(err);
      }
      return next(new ErrorAuth(err.message));
    });
};
