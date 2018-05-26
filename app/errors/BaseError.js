module.exports = class BaseError extends Error {
  constructor({ message, httpCode}) {
    super(message);
    this.message = message;
    this.httpCode = httpCode;
    Error.captureStackTrace(this, this.constructor);
  }
}