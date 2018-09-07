const Joi = require('joi');
const { BadRequest } = require('@errors');

const handleErrors = (shema) => {
  return async (req, res, next) => {

    let errors = null;
    ['body', 'params', 'query'].forEach((name) => {
      if (shema[name]) {
        errors = Joi.validate(req[name], shema[name], {abortEarly: false});
      }
    });

    if (errors && errors.error) {
      return next(new BadRequest(errors.error));
    }
    return next();
  };
};

module.exports = {
  handleErrors
}
