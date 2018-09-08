const DBService = require('@services/DBService');

module.exports = class BaseRepository {
  constructor(modelName = null, model = null) {
    this.modelName = modelName || this.constructor.name;
    this.model = model || DBService.models(this.modelName);
  }

  async findOne({ query = {}, select = {}, lean = false }) {
    try {
      return this.model.findOne(query)
        .select(select)
        .lean(lean);
    } catch (error) {
      throw error;
    }
  }

  async findAll({ query = {}, select = {}, lean = false }) {
    try {
      return this.model.find(query)
        .select(select)
        .lean(lean);
    } catch (error) {
      throw error;
    }
  }

  async findById({ query = {}, select = {}, lean = false }) {
    try {
      return this.model.findById(query)
        .select(select)
        .lean(lean);
    } catch (error) {
      throw error;
    }
  }

  async findByIdAndUpdate({ query = {}, select = {}, lean = false }) {
    try {
      return this.model.findByIdAndUpdate(query)
        .select(select)
        .lean(lean);
    } catch (error) {
      throw error;
    }
  }

  async remove({ query = {} }) {
    try {
      return this.model.remove(query);
    } catch (error) {
      throw error;
    }
  }

  async update({ query = {} }) {
    try {
      return this.model.update(query);
    } catch (error) {
      throw error;
    }
  }

  async create({ query = {} }) {
    try {
      return this.model.create(query);
    } catch (error) {
      throw error;
    }
  }

  async insertMany({ query = {} }) {
    try {
      return this.model.insertMany(query);
    } catch (error) {
      throw error;
    }
  }
};
