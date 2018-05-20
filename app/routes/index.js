const router = require('express').Router();

router.use('/user', require('@routes/user'));
router.use('/auth', require('@routes/auth'));

module.exports = router;
