const router = require('express').Router();

router.use('/api/v1', require('@routes/v1'));

module.exports = router;
