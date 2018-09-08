const DBService = require('@services/DBService');

module.exports = DBService.createModel('Company', {
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});
