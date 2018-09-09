require('dotenv-safe').load({
  path: './env/.env.test',
  sample: './env/.env.test.example',
  allowEmptyValues: true,
});
const request = require('supertest');
const server = require('./boot.app');

module.exports = request(server);

