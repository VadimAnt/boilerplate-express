const router = require('express').Router();
const controller = new (require('@controllers/UserController'))();

router.get('/', controller.index);

module.exports = router;
