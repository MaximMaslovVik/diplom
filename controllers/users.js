const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { ErrorNotFound, ErrorConfict, ErrorAuth } = require('../errors/index');
const {
  ITEM_NOT_FOUND, SUCCESSFUL_AUTH, AUTH, USER_ALREADY_EXISTS, ERROR_EMAIL_PASS,
} = require('../configs/constants');

const { JWT_SECRET } = require('../configs/secret');

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
  } catch (err) {
    return next(new ErrorConfict(USER_ALREADY_EXISTS));
  }
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

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+ password');
    if (!user) {
      return next(new ErrorAuth(ERROR_EMAIL_PASS));
    }
    if (!await User.checkUserRightPassword(password, user.password)) {
      return next(new ErrorAuth(ERROR_EMAIL_PASS));
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    return res.status(200).cookie('jwt', token, {
      maxAge: 604800000,
      httpOnly: true,
      sameSite: true,
    })
      .send(token)
      .end();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createUser, getUser, login,
};
