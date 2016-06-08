const handler = require('feathers-errors/handler');
const notFound = require('./not-found-handler');

module.exports = function () {
  // Add your custom middleware here. Remember, that
  // just like Express the order matters, so error
  // handling middleware should go last.
  const app = this;

  app.use(notFound());
  app.use(handler());
};
