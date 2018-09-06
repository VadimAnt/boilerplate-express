const httpStatus = require('http-status');
const BaseError = require('./BaseError');

module.exports = class AlreadyExist extends BaseError {
  constructor(message) {
    super({ message, status: httpStatus.UNAUTHORIZED });
  }
};
