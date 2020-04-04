const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const ERROR_EMAIL_PASS = require('../configs/constants');
const INVALID_LINK = require('../configs/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (valid) => isEmail(valid),
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

userSchema.statics.findUserByCredentials = function check(email, password) {
  return this.findOne({ email }).select('+ password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(ERROR_EMAIL_PASS));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(ERROR_EMAIL_PASS));
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
