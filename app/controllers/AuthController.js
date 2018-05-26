const UserModel = require('@models/UserModel');
const AuthService = require('@services/auth/AuthService');
const CryptoService = require('@services/CryptoService');

module.exports = class UserController {
  constructor() {
    this.repository = new UserModel();

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  async login(req, res) {
    res.send({
      token: await AuthService.sign(JSON.stringify(req.user.toJSON())),
    });
  }

  async register(req, res) {
    await this.repository.create({ query:{
      email: 'test@gmail.com',
      password: await CryptoService.hash('secret'),
    } });

    res.send({ sucess: true });
  }

};
