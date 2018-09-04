const router = require('express').Router();

router.use('/auth', require('@routes/v1/auth'));
router.use('/users', require('@routes/v1/user'));

module.exports = router;
