const BaseRepository = require('@repo/BaseRepository');

module.exports = class UserRepository extends BaseRepository {
  constructor() {
    super('User');
  }
};
