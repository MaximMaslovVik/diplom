const ErrorReq = require('./error-req');
const ErrorForbidden = require('./error-forbidden');
const ErrorNotFound = require('./error-notFound');
/* const ErrorConflictingRequest = require('./error-conflictingRequest'); */
const ErrorAuth = require('./error-auth');

module.exports = {
  ErrorReq,
  ErrorForbidden,
  ErrorNotFound,
  /* ErrorConflictingRequest, */
  ErrorAuth,
};
