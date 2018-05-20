const UserRepository = require('@repo/UserRepository');

module.exports = class UserController {
  constructor() {
    this.repository = new UserRepository();

    this.index = this.index.bind(this);
  }

  index(req, res) {
    this.repository.findAll({});
    console.log('test');
    res.send('test');
  }

};
