const provider = require('mongoose');
const fs = require('fs');

const { Schema } = provider;
let connection = null;

module.exports = class DBService {
  static initModels() {
    try {
      fs.readdirSync('./app/models/schema').forEach((file) => {
        require(`@models/schema/${file}`);
      });

      return true;
    } catch (error) {
      throw error;
    }
  }

  static models(modelName) {
    if (modelName) {
      return connection.models[modelName];
    }

    return connection.models;
  }

  static createModel(modelName, schema) {
    return connection.model(modelName, new Schema(schema));
  }

  static getTypes() {
    return Schema.Types;
  }

  static async connect({ params }) {
    const config = {
      dialect: params.dialect,
      host: params.host,
      port: params.port,
      user: params.user,
      pass: params.pass,
      database: params.database,
    };

    connection = provider.createConnection(`${config.dialect}://${config.user}:${config.pass}@${config.host}:${config.port}/${config.database}`);
    DBService.initModels();

    return connection;
  }
};
