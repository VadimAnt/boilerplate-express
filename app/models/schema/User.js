const DBService = require('@services/DBService');
console.log('execute');
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
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
});
