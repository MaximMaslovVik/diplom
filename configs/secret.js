require('dotenv').config();
const DEV_DB_HOST = require('mongoose');

const {
  NODE_ENV, DB_HOST, PORT, SECRET,
} = process.env;
const DEV_SECRET = 'SECRETSECRETSECRET';
const DEV_PORT = 3000;

const DB = NODE_ENV === 'production' && DB_HOST ? DB_HOST : DEV_DB_HOST;
const SERVER_PORT = NODE_ENV === 'production' && PORT ? PORT : DEV_PORT;
const SECRET_STRING = NODE_ENV === 'production' && SECRET ? SECRET : DEV_SECRET;

DEV_DB_HOST.connect('mongodb://localhost:27017/news-apidb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
console.log({
  SERVER_PORT,
});

module.exports.PORT = process.env.PORT || 3000;
module.exports.JWT_SECRET = process.env.JWT_SECRET || 'secret key';
module.exports.CODE = process.env.NODE_ENV !== 'production';
module.exports = {
  DB,
  SERVER_PORT,
  SECRET_STRING,
};
