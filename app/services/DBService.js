const provider = require('mongoose');
const fs = require('fs');

const { Schema } = provider;
const SCHEMA_PATH = './app/models/schema';
let connect = null;

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
      provider.connect(conString, { useNewUrlParser: true }).catch((error) => {
        throw error;
      });

      connect = provider.connection;

      // connect.once('open', () => {
      //   process.stdout.write('Connected to mongo');
      // });

      // connect.on('error', (error) => {
      //   process.stdout.write(error);
      // });

      DBService.initModels();
      return connect;
    } catch (error) {
      throw error;
    }
  }
};
