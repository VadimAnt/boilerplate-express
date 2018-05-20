const router = require('express').Router();
const controller = new (require('@controllers/UserController'))();
const AuthService = require('@services/AuthService');

router.get('/', controller.index);
router.get('/test', AuthService.verify(), (req, res) => {
  console.log(req.user);
  res.send('fdsfsdfsdfsdfds');
});

module.exports = router;
