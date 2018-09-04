const router = require('express').Router();
const { UserController } = require('@controllers');
const { AuthService } = require('@services');

router.get('/', AuthService.verify(), UserController.getAll);
router.get('/:id', AuthService.verify(), UserController.getOne);
router.post('/', AuthService.verify(), UserController.create);

module.exports = router;
