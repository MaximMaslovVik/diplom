const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { NotFoundError, ErrorAuth } = require('../errors/index');
const User = require('../models/user');
const { INVALID_REQUEST, AUTH } = require('../configs/constants');
const { SECRET_STRING } = require('../configs/secret');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  if (password.length > 11) {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name, email, password: hash,
      }))
      .then(() => res.send({ data: { name, email } }))
      .catch(next);
  }
};

module.exports.getUsers = (req, res) => {
  User.findById(req.user._id)
    .then((userId) => {
      if (!userId) {
        throw new NotFoundError(INVALID_REQUEST);
      } else {
        res.send({ userId });
      }
    })
    .catch(new NotFoundError(INVALID_REQUEST));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_STRING, { expiresIn: '7d' });
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
