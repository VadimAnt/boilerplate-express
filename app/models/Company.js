const DBService = require('../services/DBService');

class Company {}

module.exports = DBService.model('Company', Company, {
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});
