const router = require('express').Router();
const controller = new (require('@controllers/UserController'))();
const AuthService = require('@services/auth/AuthService');

router.get('/', AuthService.verify(), controller.getAll);
router.get('/:id', AuthService.verify(), controller.getOne);
router.post('/', AuthService.verify(), controller.create);

module.exports = router;
