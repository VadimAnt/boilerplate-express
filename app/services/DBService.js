const provider = require('mongoose');
const fs = require('fs');

const { Schema } = provider;

class DBService {
  constructor() {
    this.connection = null;
    this.provider = provider;
    this.loadModels = false;
  }

  initModels() {
    try {
      fs.readdirSync('./app/models/schema').forEach((file) => {
        require(`@models/schema/${file}`);
      });

      this.loadModels = true;
      return this.loadModels;
    } catch (error) {
      throw error;
    }
  }

  models(modelName) {
    if (modelName) {
      return this.connection.models[modelName];
    }

    return this.connection.models;
  }

  createModel(modelName, schema) {
    return this.connection.model(modelName, new Schema(schema));
  }

  connect(config) {
    this.connection = this.provider.createConnection(`${config.dialect}://${config.user}:${config.pass}@${config.host}:${config.port}/${config.name}`);
    this.initModels();

    return this.connection;
  }
}

module.exports = new DBService();
