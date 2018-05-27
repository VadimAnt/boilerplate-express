const router = require('express').Router();
const AuthService = require('@services/auth/AuthService');
const controller = new (require('@controllers/AuthController'))();

router.post('/signin', AuthService.verify('local'), controller.signin);
router.post('/signin', AuthService.verify('jwt'), controller.logout);
router.post('/signup', controller.signup);

module.exports = router;
