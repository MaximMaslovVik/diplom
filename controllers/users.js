const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { ErrorNotFound, ErrorAuth } = require('../errors/index');
const {
  ITEM_NOT_FOUND, SUCCESSFUL_AUTH, AUTH,
} = require('../configs/constants');
/*
const { SECRET_STRING } = require('../configs/secret');
*/
const User = require('../models/user');

const createUser = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    const hash = await bcrypt.hash(password.trim(), 10);
    await User.create({
      email: email.trim(),
      password: hash,
      name: name.trim(),
    });
      res.status(201).send(SUCCESSFUL_AUTH);
  } catch (next) {}
};


const getUser = (req, res, next) => {
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

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '7d' });
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

module.exports = {
  createUser, getUser, login,
};
