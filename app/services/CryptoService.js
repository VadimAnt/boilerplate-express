const provider = require('bcrypt');
const config = require('../../boot/boot.config').security;

module.exports = {

  async hash(plainString) {
    return provider.hash(plainString, config.saltRounds);
  },

  async compare(plainString, hashString) {
    return provider.compare(plainString, hashString);
  },

};
