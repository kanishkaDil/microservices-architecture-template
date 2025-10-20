const ResponseUtil = require('../utils/response.util');

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Handle specific error types
  if (err.name === 'ValidationError') {
    return ResponseUtil.badRequest(res, 'Validation failed', err.errors);
  }

  if (err.name === 'UnauthorizedError') {
    return ResponseUtil.unauthorized(res, err.message);
  }

  // Default to 500 server error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  return ResponseUtil.error(res, message, statusCode);
};

module.exports = { errorHandler };