const { SERVER_ERROR } = require('../configs/constants');

const errorHandler = (error, req, res) => {
  const { statusCode = 500, message } = error;
  res.status(statusCode).send({ message: statusCode === 500 ? SERVER_ERROR : message });
};

module.exports = errorHandler;
