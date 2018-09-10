const provider = require('mongoose');
const { Schema } = require('mongoose');

let connection = null;

module.exports = {
  connect(config) {
    const userCred = `${config.user}:${config.pass}`;
    const host = `${config.host}:${config.port}/${config.name}`;

    connection = provider.createConnection(
      `${config.dialect}://${userCred}@${host}`,
      { useNewUrlParser: true },
    );

    return connection;
  },

  getConnection() {
    if (connection) {
      return connection;
    }
    return false;
  },

  model(name, cls, schema) {
    const initSchema = new Schema(schema);
    initSchema.loadClass(cls);
    return connection.model(name, initSchema);
  },
};
