const router = require('express').Router();
const { AuthService } = require('@services');
const { AuthController } = require('@controllers');
const { handleErrors } = require('../../../../middlewares/validators');
const schema = require('../../../../middlewares/validators/auth');

router.post('/signin', handleErrors(schema.signin), AuthService.verify('local'), AuthController.signin);
router.post('/logout', AuthService.verify(), AuthController.logout);
router.post('/signup', AuthController.signup);

module.exports = router;
