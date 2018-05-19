const provider = require('mongoose');
const fs = require('fs');
const { Schema } = provider;

module.exports = class DBService {

  static initModels() {
    try {

      fs.readdirSync('./app/models').forEach((file) => {
        require(`@models/${file}`);
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
    return provider.model(modelName, new Schema(schema));
  }

  static getTypes() {
    return Schema.Types;
  }

  static async connect() {
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
    
    await (async () => {
      try {
        
        await provider.connect(conString);
        DBService.initModels();

      } catch (error) {
        throw error;
      }
    })();

    return provider;
  }

};
