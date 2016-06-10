const feathers = require('feathers');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const bodyParser = require('body-parser');
const middleware = require('./middleware');
const services = require('./services');
const authentication = require('feathers-authentication');

const app = feathers();

app
  .configure(rest())
  .configure(hooks())
  .configure(socketio())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(authentication())
  .configure(services)
  .configure(middleware);

module.exports = app;
