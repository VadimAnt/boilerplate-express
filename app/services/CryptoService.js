const provider = require('bcrypt');
const saltRounds = 10;

module.exports = class CryptoService {

  static async hash(plainString) {
    return provider.hash(plainString, saltRounds);
  }

  static async compare(plainString, hashString) {
    return provider.compare(plainString, hashString);
  }

};
