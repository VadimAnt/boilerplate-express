const router = require('express').Router();
const AuthService = require('@services/auth/AuthService');
const controller = new (require('@controllers/AuthController'))();

router.post('/login', AuthService.verify('local'), controller.login);
router.post('/reg', controller.register);

module.exports = router;
