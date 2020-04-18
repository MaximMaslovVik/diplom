const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { usersEmail } = require('../configs/validate');

const { INVALID_LINK, ERROR_EMAIL_PASS } = require('../configs/constants');
const { ErrorAuth } = require('../errors/index');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: usersEmail,
      message: INVALID_LINK,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

userSchema.statics.checkUserRightPassword = async function (password, userPassword) {
  return bcrypt.compare(password, userPassword);
};

module.exports = mongoose.model('user', userSchema);
