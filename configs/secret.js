require('dotenv').config();

const {
  NODE_ENV, DB_HOST, SECRET,
} = process.env;
const DEV_SECRET = 'secret key';
const DEV_DB_HOST = 'mongodb://localhost:27017/news-apidb';
const DB = NODE_ENV === 'production' && DB_HOST ? DB_HOST : DEV_DB_HOST;
const SECRET_STRING = NODE_ENV === 'production' && SECRET ? SECRET : DEV_SECRET;
const PORT = process.env.PORT || 3000;

console.log({
  DB,
  PORT,
});

module.exports.JWT_SECRET = process.env.JWT_SECRET || 'secret key';
module.exports = {
  DB,
  SECRET_STRING,
  PORT,
};
