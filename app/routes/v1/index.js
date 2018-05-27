const router = require('express').Router();

router.use('/auth', require('@routes/v1/auth'));
router.use('/user', require('@routes/v1/user'));

module.exports = router;