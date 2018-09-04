const BaseModel = require('@models/BaseModel');

module.exports = class UserModel extends BaseModel {
  constructor() {
    super({ modelName: 'User' });
  }
};
