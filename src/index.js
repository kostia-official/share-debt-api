const app = require('./app');
const debug = require('debug')('app');
const config = require('getconfig');
const port = config.port;
const server = app.listen(config.port);
app.setup(server);

server.on('listening', () =>
  debug(`Feathers application started on ${config.host}:${port}`)
);
