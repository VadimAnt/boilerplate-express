const Joi = require('joi');

module.exports = {
  signin: {
    body: Joi.object().keys({
      email: Joi.string().email().required().label('Email field'),
      password: Joi.string().min(5).required().error(() => 'Password requires a positive number'),
    }),
  },
};
