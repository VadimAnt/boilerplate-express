const router = require('express').Router();

router.use('/auth', require('@routes/api/v1/auth'));
router.use('/users', require('@routes/api/v1/user'));

module.exports = router;
