const provider = require('mongoose');
const fs = require('fs');

const SCHEMA_PATH = './app/models/schema';

const { Schema } = provider;

class DBService {
  constructor() {
    this.connection = null;
    this.provider = provider;
    this.loadModels = false;
  }

  initModels() {
    try {
      fs.readdirSync(SCHEMA_PATH).forEach((file) => {
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
    const userCred = `${config.user}:${config.pass}`;
    const host = `${config.host}:${config.port}/${config.name}`;

    this.connection = this.provider.createConnection(
      `${config.dialect}://${userCred}@${host}`,
      { useNewUrlParser: true },
    );
    this.initModels();

    return this.connection;
  }
}

module.exports = new DBService();
