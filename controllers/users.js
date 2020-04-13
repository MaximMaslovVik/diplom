const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ErrorNotFound, ErrorAuth, ErrorRequest } = require('../errors/index');
const User = require('../models/user');
const {
  INVALID_REQUEST, AUTH, USEWR_ALREADY, INVALID_LINK,
} = require('../configs/constants');
/*
const { SECRET_STRING } = require('../configs/secret');
*/
module.exports.createUser = (req, res) => {
  const { name, email, password } = req.body;
  if (password.length > 11) {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name, email, password: hash,
      }))
      .then(() => res.send({ data: { name, email } }))
      .catch(new ErrorRequest(USEWR_ALREADY));
  } else {
    throw new ErrorAuth(INVALID_LINK);
  }
};

module.exports.getUsers = (req, res, next) => {
  User.findById(req.user._id)
    .then((userId) => {
      if (!userId) {
        throw new ErrorNotFound(INVALID_REQUEST);
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
      const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
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
