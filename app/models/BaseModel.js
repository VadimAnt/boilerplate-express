const DBService = require('@services/DBService');


module.exports = class BaseRepository {
  constructor({ modelName, model = null }) {
    this.modelName = modelName;
    this.model = model || DBService.models(this.modelName);
  }

  async findOne({ query = {}, select = {}, lean = false }) {
    return this.model.findOne(query).select(select).lean(lean);
  }

  async findAll({ query = {}, select = {}, lean = false }) {
    return this.model.find(query).select(select).lean(lean);
  }

  async findById({ query = {}, select = {}, lean = false }) {
    return this.model.findById(query).select(select).lean(lean);
  }

  async findByIdAndUpdate({ query = {}, select = {}, lean = false }) {
    return this.model.findByIdAndUpdate(query).select(select).lean(lean);
  }

  async remove({ query = {} }) {
    return this.model.remove(query);
  }

  async update({ query = {} }) {
    return this.model.update(query);
  }

  async create({ query = {} }) {
    return this.model.create(query);
  }

  async insertMany({ query = {} }) {
    return this.model.insertMany(query);
  }
};
