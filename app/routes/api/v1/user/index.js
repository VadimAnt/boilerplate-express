const router = require('express').Router();
const { UserController } = require('../../../../controllers');
const { AuthService } = require('../../../../services');

router.get(
  '/',
  AuthService.isAuthenticated(),
  UserController.getAll,
);

router.get(
  '/:id',
  AuthService.isAuthenticated(),
  UserController.getOne,
);

router.post(
  '/',
  AuthService.isAuthenticated(),
  UserController.create,
);

module.exports = router;
