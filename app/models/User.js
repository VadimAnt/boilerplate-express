const DBService = require('../services/DBService');


class User {
  static findByEmail(email) {
    return this.findOne({ email });
  }
}

module.exports = DBService.model('User', User, {
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
});
