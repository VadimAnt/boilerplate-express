const UserModel = require('@models/UserModel');
const CryptoService = require('@services/CryptoService');

const userModel = new UserModel();

const UserController = {
  async getAll(req, res) {
    const users = await userModel.findAll({});
    res.send({
      data: users,
    });
  },

  async create(req, res) {
    const data = {
      email: req.body.email,
      phone: req.body.phone,
      password: await CryptoService.hash(req.body.password),
      name: req.body.name,
    };

    const user = await userModel.create({ query: data });
    res.send({
      data: user,
    });
  },

  async getOne(req, res) {
    const user = await userModel.findOne({ query: { _id: req.params.id } });
    res.send({
      data: user,
    });
  },
};

module.exports = UserController;
