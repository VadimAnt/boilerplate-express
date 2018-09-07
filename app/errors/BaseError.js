module.exports = class BaseError extends Error {
  constructor({ message, status, logLevel = 'warn' }) {
    super(message);
    this.message = message;
    this.status = status || 400;
    this.logLevel = logLevel;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      success: false,
      status: this.status,
      message: this.message,
      stack: process.env.NODE_ENV === 'development' ? this.stack : [],
    };
  }
};
