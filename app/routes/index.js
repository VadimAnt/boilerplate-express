const router = require('express').Router();

router.use('/api', (req, res) => {
  res.send({
    success: true,
    data: { message: 'Everything alright I work =)' },
  });
});
router.use('/api/v1', require('@routes/api/v1'));

module.exports = router;
