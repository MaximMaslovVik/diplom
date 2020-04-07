require('dotenv').config();
const mongoose = require('mongoose');

const {
  NODE_ENV, DB_HOST, PORT, SECRET,
} = process.env;

const DEV_SECRET = 'secret key';
const DEV_DB_HOST = 'mongodb://localhost:27017/news-api';

mongoose.connect(DEV_DB_HOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
const DEV_PORT = 3000;
const DB = NODE_ENV === 'production' && DB_HOST ? DB_HOST : DEV_DB_HOST;
const SERVER_PORT = NODE_ENV === 'production' && PORT ? PORT : DEV_PORT;
const SECRET_STRING = NODE_ENV === 'production' && SECRET ? SECRET : DEV_SECRET;

console.log({
  DB,
  SERVER_PORT,
});

module.exports.JWT_SECRET = process.env.JWT_SECRET || 'secret key';
module.exports = {
  DB,
  SECRET_STRING,
  SERVER_PORT,
  DEV_DB_HOST,
  DEV_SECRET,
};
