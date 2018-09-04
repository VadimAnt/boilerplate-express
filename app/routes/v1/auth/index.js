const router = require('express').Router();
const { AuthService } = require('@services');
const { AuthController } = require('@controllers');

router.post('/signin', AuthService.verify('local'), AuthController.signin);
router.post('/signin', AuthService.verify(), AuthController.logout);
router.post('/signup', AuthController.signup);

module.exports = router;
