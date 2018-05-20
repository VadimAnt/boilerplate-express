const UserRepository = require('@repo/UserRepository');
const AuthService = require('@services/AuthService');

module.exports = class UserController {
  constructor() {
    this.repository = new UserRepository();

    this.index = this.index.bind(this);
  }

  async index(req, res) {
    this.repository.findAll({});
    console.log();
    res.send(await AuthService.sign({ user: 1 }));
  }

};
