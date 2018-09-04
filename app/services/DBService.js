const provider = require('mongoose');
const fs = require('fs');

const { Schema } = provider;
const SCHEMA_PATH = './app/models/schema';

provider.Promise = global.Promise;

module.exports = class DBService {
  static initModels() {
    try {
      fs.readdirSync(SCHEMA_PATH).forEach((schema) => {
        require(`@models/schema/${schema}`);
      });

      return true;
    } catch (error) {
      throw error;
    }
  }

  static models(modelName) {
    if (modelName) {
      return provider.models[modelName];
    }

    return provider.models;
  }

  static createModel(modelName, schema) {
    try {
      provider.Promise = global.Promise;
      return provider.model(modelName, new Schema(schema));
    } catch (error) {
      throw error;
    }
  }

  static getTypes() {
    return Schema.Types;
  }

  static connect() {
    const config = {
      dialect: process.env.DB_DIALECT,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    };

    provider.Promise = global.Promise;

    const conString = `${config.dialect}://${config.user}:${config.pass}@${config.host}:${config.port}/${config.database}`;

    try {
      provider.connect(conString, { useNewUrlParser: true });
      DBService.initModels();

      return provider;
    } catch (error) {
      throw error;
    }
  }
};
