const router = require('express').Router();

router.use('/auth', require('./Auth'));
router.use('/users', require('./User'));

module.exports = router;
