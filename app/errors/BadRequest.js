const BaseError = require('./BaseError');

module.exports = class BadRequest extends BaseError {
  constructor(message) {
    super({ message, httpCode: 404 });
  }

};
