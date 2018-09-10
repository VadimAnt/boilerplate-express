const { Response } = require('../../utils');
const { UserModel } = require('../../models');
const { CryptoService } = require('../../services');

const UserController = {
  async getAll(req, res, next) {
    try {
      const users = await UserModel.find();
      return Response.success(res, users);
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

      const user = new UserModel({ ...data });
      await user.save();
      return Response.success(res, user);
    } catch (error) {
      return next(error);
    }
  },

  async getOne(req, res, next) {
    try {
      const user = await UserModel.findOne({ _id: req.params.id });
      return Response.success(res, user);
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = UserController;
