const UserRepository = require('@repo/UserRepository');

module.exports = class UserController {
  constructor() {
    this.repository = new UserRepository();
  }

  index(req, res) {
    this.test = 'test';
    res.send('test');
  }

};
