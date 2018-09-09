const server = require('../../boot/boot.test');

describe('Main Test Runner', () => {
  before(async () => {});

  it('Should Run All Tests', async () => require('./api/get')(server));

  after(async () => {});
});
