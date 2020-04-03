const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NotFoundError, ErrorAuth } = require('../errors/index');
const Error500 = require('../errors/error-server');
const {
  AUTH, INVALID_REQUEST, BAD_REQUEST, ITEM_NOT_FOUND,
} = require('../configs/constants');

const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, email, password } = req.body;
  if (password.length > 8) {
    bcrypt.hash(password, 8)
      .then((hash) => User.create({
        name, email, password: hash,
      }))
      .then(() => res.send({ data: { name, email } }))
      .catch(() => res.status(500).send(INVALID_REQUEST));
  } else { throw new Error500(BAD_REQUEST); }
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((userId) => {
      if (!userId) {
        throw new NotFoundError(ITEM_NOT_FOUND);
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
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      })
        .send(token)
        .end();
    })
    .catch(ErrorAuth(AUTH));
};
