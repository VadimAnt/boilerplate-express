const { UserModel } = require('@models');
const { AuthService, CryptoService } = require('@services');

const userModel = new UserModel();

const UserController = {
  async signin(req, res, next) {
    try {
      return res.send({
        data: {
          access_token: await AuthService.sign(JSON.stringify(req.user.toJSON())),
          user: req.user,
        },
      });
    } catch (error) {
      return next(error);
    }
  },

  async logout(req, res, next) {
    try {
      return res.send({
        data: {
          token: await AuthService.sign(JSON.stringify(req.user.toJSON())),
        },
      });
    } catch (error) {
      return next(error);
    }
  },

  async signup(req, res, next) {
    try {
      await userModel.create({
        query: {
          email: 'test@gmail.com',
          password: await CryptoService.hash('secret'),
        },
      });

      return res.send({ sucess: true });
    } catch (error) {
      return next(error);
    }
  },

};

module.exports = UserController;
