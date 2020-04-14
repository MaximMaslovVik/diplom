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

userSchema.statics.findUserByCredentials = function check(email, password) {
  return this.findOne({ email }).select('+ password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new ErrorAuth(ERROR_EMAIL_PASS));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new ErrorAuth(ERROR_EMAIL_PASS));
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
