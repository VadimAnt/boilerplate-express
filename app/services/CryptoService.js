const provider = require('bcrypt');

const saltRounds = 10;

module.exports = {

  async hash(plainString) {
    return provider.hash(plainString, saltRounds);
  },

  async compare(plainString, hashString) {
    return provider.compare(plainString, hashString);
  },

};
