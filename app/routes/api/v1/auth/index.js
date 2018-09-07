const router = require('express').Router();
const { AuthService } = require('@services');
const { AuthController } = require('@controllers');
const { validate } = require('@validators');
const AuthSchema = require('@validators/auth');

router.post(
  '/signin',
  validate(AuthSchema.signin),
  AuthService.verify('local'),
  AuthController.signin,
);

router.post(
  '/signup',
  validate(AuthSchema.signup),
  AuthController.signup,
);

router.post(
  '/logout',
  validate(AuthSchema.signup),
  AuthService.verify(),
  AuthController.logout,
);


module.exports = router;
