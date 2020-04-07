const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { NotFoundError, ErrorAuth } = require('../errors/index');
const User = require('../models/user');
const { ERROR_EMAIL_PASS, INVALID_REQUEST, SUCCESSFUL_AUTH } = require('../configs/constants');
const { NODE_ENV, JWT_SECRET, EV_SECRET } = require('../configs/secret');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .then((user) => {
      if (user.length === 0) {
        throw new NotFoundError(INVALID_REQUEST);
      }
      res.send({ name: user.name, email: user.email });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new ErrorAuth(ERROR_EMAIL_PASS);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new ErrorAuth(ERROR_EMAIL_PASS);
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : EV_SECRET,
            { expiresIn: '7d' },
          );
          return res.cookie('jwt', token, {
            maxAge: 604800000,
            httpOnly: true,
            sameSite: true,
          })
            .send({
              message: SUCCESSFUL_AUTH,
              userToken: token,
              name: user.name,
              email: user.email,
            })
            .end();
        });
    })
    .catch(next);
};
