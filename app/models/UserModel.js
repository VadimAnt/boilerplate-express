const BaseModel = require('@models/BaseModel');

module.exports = class UserModel extends BaseModel {
  constructor(modelName = 'User') {
    super(modelName);
  }
};
