const app = require('./app');
const debug = require('debug')('app');
const { port, host } = require('getconfig');
const server = app.listen(port);
app.setup(server);

server.on('listening', () => debug(`Server started on ${host}:${port}`));
