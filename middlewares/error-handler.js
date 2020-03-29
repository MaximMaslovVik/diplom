const { SERVER_ERROR } = require('../configs/constants');

const errorHandler = (err, req, res) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? SERVER_ERROR : message });
};
module.exports = errorHandler;
