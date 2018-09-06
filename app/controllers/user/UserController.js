const { UserModel } = require('@models');
const { CryptoService } = require('@services');

const userModel = new UserModel();

const UserController = {
  async getAll(req, res, next) {
    try {
      const users = await userModel.findAll({});
      return res.send({ data: users });
    } catch (error) {
      return next(error);
    }
  },

  async create(req, res, next) {
    try {
      const data = {
        email: req.body.email,
        phone: req.body.phone,
        password: await CryptoService.hash(req.body.password),
        name: req.body.name,
      };

      const user = await userModel.create({ query: data });
      return res.send({ data: user });
    } catch (error) {
      return next(error);
    }
  },

  async getOne(req, res, next) {
    try {
      const user = await userModel.findOne({ query: { _id: req.params.id } });
      return res.send({ data: user });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = UserController;
