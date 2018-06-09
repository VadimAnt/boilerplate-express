const UserModel = require('@models/UserModel');
const CryptoService = require('@services/CryptoService');

module.exports = class UserController {
  constructor() {
    this.repository = new UserModel();

    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.create = this.create.bind(this);
  }

  async getAll(req, res) {
    const users = await this.repository.findAll({});
    res.send({
      data: users,
    });
  }

  async create(req, res) {
    const data = {
      email: req.body.email,
      phone: req.body.phone,
      password: await CryptoService.hash(req.body.password),
      name: req.body.name,
    };
    console.log(data);
    const user = await this.repository.create({ query: data });

    res.send({
      data: user,
    });
  }

  async getOne(req, res) {
    const user = await this.repository.findOne({ query: { _id: req.params.id }});
    res.send({
      data: user,
    });
  }

};
