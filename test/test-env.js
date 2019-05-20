process.env.NODE_ENV = 'test';

const app = require('../src/app');
const randomPort = require('random-port');
const sinon = require('sinon');
const request = require('supertest-promised')(app);
const helpers = require('./helpers')(app);

randomPort((port) => {
  const server = app.listen(port);
  app.setup(server);
});

module.exports = { app, sinon, request, helpers };
