const DBService = require('@services/DBService');


module.exports = class BaseRepository {
  constructor(modelName) {
    this._modelName = modelName;
    this._model = DBService.models(this._modelName);
  }

  get model() {
    return this._model;
  }

  findOne({ query = {}, select = {}, lean = false }) {
    this._model.findOne(query).select(select).lean(lean);
  }

  findAll({ query = {}, select = {}, lean = false }) {
    this._model.find(query).select(select).lean(lean);
  }

  findById({ query = {}, select = {}, lean = false }) {
    this._model.findById(query).select(select).lean(lean);
  }

  findByIdAndUpdate({ query = {}, select = {}, lean = false }) {
    this._model.findByIdAndUpdate(query).select(select).lean(lean);
  }

  remove({ query = {} }) {
    this._model.remove(query);
  }

  update({ query = {} }) {
    this._model.update(query);
  }

  create({ query = {} }) {
    this._model.create(query);
  }

  insertMany({ query = {} }) {
    this._model.insertMany(query);
  }

};
