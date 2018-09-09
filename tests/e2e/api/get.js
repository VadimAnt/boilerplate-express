const { expect } = require('chai');

module.exports = (server) => {
  describe('# GET /api', () => {
    it('Test I work =)', async () => {
      const response = await server.get('/api');
      expect(response.body).to.be.a('object');
      expect(response.body.success).to.equal(true);
      expect(response.body.data).to.be.a('object');
      expect(response.body.data.message).to.be.a('string');
      return true;
    });
  });
};
