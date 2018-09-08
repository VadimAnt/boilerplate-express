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
    if (modelName && this.loadModels) {
      return this.connection.models[modelName];
    }

    if (this.loadModels) {
      return this.connection.models;
    }

    return {};
  }

  createModel(modelName, schema) {
    if (this.connection) {
      return this.connection.model(modelName, new Schema(schema));
    }
    return false;
  }

  connect(config) {
    this.connection = this.provider.createConnection(`${config.dialect}://${config.user}:${config.pass}@${config.host}:${config.port}/${config.name}`, { useNewUrlParser: true });
    this.initModels();

    return this.connection;
  }
}

module.exports = new DBService();
