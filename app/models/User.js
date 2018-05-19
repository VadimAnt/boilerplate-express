const DBService = require('@services/DBService');

module.exports = DBService.createModel('User', {
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  clients: [{}],
});
