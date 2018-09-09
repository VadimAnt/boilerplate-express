const router = require('express').Router();
const { AuthService } = require('../../services');
const { AuthController } = require('../../controllers');
const { validate } = require('../../middlewares/validators');
const AuthSchema = require('../../middlewares/validators/auth');

router.post(
  '/signin',
  validate(AuthSchema.signin),
  AuthService.verifyUserCred(),
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
  AuthService.isAuthenticated(),
  AuthController.logout,
);


module.exports = router;
