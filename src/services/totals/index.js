const Service = require('../base-service');
const totalsTo = require('./routes/totals-to');
const auth = require('feathers-authentication').hooks;

module.exports = function () {
  const app = this;

  app.service('/totals/to/:to', { find: totalsTo });

  app.service('/totals', new Service({ Model: require('./model') }));

};
