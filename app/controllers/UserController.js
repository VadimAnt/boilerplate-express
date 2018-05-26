const UserModel = require('@models/UserModel');
const AuthService = require('@services/auth/AuthService');

module.exports = class UserController {
  constructor() {
    this.repository = new UserModel();

    this.index = this.index.bind(this);
  }

  async index(req, res) {
    this.repository.findAll({});
    res.send(await AuthService.sign({ user: 1 }));
  }

};
