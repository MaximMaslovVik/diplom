const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const NotFoundError = require('../errors/error_not_found');
const Error401 = require('../errors/error_Auth');
const User = require('../models/user');

const { JWT_SECRET } = require('../configs/secret');

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
        throw new NotFoundError('Такого пользователя нет');
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
      if (err.message !== 'Неправильные почта или пароль') {
        return next(err);
      }
      return next(new Error401(err.message));
    });
};
