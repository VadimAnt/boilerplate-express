const UserModel = require('@models/UserModel');
const { AuthService, CryptoService } = require('@services');

const userModel = new UserModel();

const UserController = {
  async signin(req, res) {
    res.send({
      data: {
        access_token: await AuthService.sign(JSON.stringify(req.user.toJSON())),
        user: req.user,
      },
    });
  },

  async logout(req, res) {
    res.send({
      data: {
        token: await AuthService.sign(JSON.stringify(req.user.toJSON())),
      },
    });
  },

  async signup(req, res) {
    await userModel.create({
      query: {
        email: 'test@gmail.com',
        password: await CryptoService.hash('secret'),
      },
    });

    res.send({ sucess: true });
  },

};

module.exports = UserController;
