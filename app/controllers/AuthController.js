const UserModel = require('@models/UserModel');
const AuthService = require('@services/auth/AuthService');
const CryptoService = require('@services/CryptoService');

module.exports = class UserController {
  constructor() {
    this.repository = new UserModel();

    this.signin = this.signin.bind(this);
    this.logout = this.logout.bind(this);
    this.signup = this.signup.bind(this);
  }

  async signin(req, res) {
    res.send({
      data: {
        access_token: await AuthService.sign(JSON.stringify(req.user.toJSON())),
        user: req.user,
      },
    });
  }

  async logout(req, res) {
    res.send({
      data: {
        token: await AuthService.sign(JSON.stringify(req.user.toJSON())),
      },
    });
  }

  async signup(req, res) {
    await this.repository.create({ query:{
      email: 'test@gmail.com',
      password: await CryptoService.hash('secret'),
    } });

    res.send({ sucess: true });
  }

};
