const DBService = require('@services/DBService');


module.exports = class BaseRepository {
  constructor(modelName) {
    this._modelName = modelName;
    this._model = DBService.models(this._modelName);
  }

  get model() {
    return this._model;
  }

  async findOne({ query = {}, select = {}, lean = false }) {
    return this._model.findOne(query).select(select).lean(lean);
  }

  async findAll({ query = {}, select = {}, lean = false }) {
    return this._model.find(query).select(select).lean(lean);
  }

  async findById({ query = {}, select = {}, lean = false }) {
    return this._model.findById(query).select(select).lean(lean);
  }

  async findByIdAndUpdate({ query = {}, select = {}, lean = false }) {
    return this._model.findByIdAndUpdate(query).select(select).lean(lean);
  }

  async remove({ query = {} }) {
    return this._model.remove(query);
  }

  async update({ query = {} }) {
    return this._model.update(query);
  }

  async create({ query = {} }) {
    return this._model.create(query);
  }

  async insertMany({ query = {} }) {
    return this._model.insertMany(query);
  }

};
