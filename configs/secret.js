require('dotenv').config();

const DEV_SECRET = 'secret key';

module.exports.DEV_DB_HOST = 'mongodb://localhost:27017/news-api';
module.exports.PORT = process.env.PORT || 3000;
module.exports.JWT_SECRET = process.env.JWT_SECRET || DEV_SECRET ;
module.exports.CODE = process.env.NODE_ENV !== 'production';
