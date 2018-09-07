const Joi = require('joi');
const { BadRequest } = require('@errors');

const JOI_OPTIONS = {
  abortEarly: false,
};

const validate = schema => async (req, res, next) => {
  let errors = null;
  ['body', 'params', 'query'].forEach((name) => {
    if (schema[name]) {
      errors = Joi.validate(req[name], schema[name], JOI_OPTIONS);
    }
  });

  if (errors && errors.error) {
    return next(new BadRequest(errors.error));
  }
  return next();
};

module.exports = {
  validate,
};
