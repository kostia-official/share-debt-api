const Service = require('../base-service');
const totalsTo = require('./routes/totals-to');
const totalsFrom = require('./routes/totals-from');
const auth = require('feathers-authentication').hooks;

module.exports = function () {
  const app = this;

  app.service('/totals/to', { find: totalsTo })
    .before({
      all: [
        auth.verifyToken(),
        auth.populateUser(),
        auth.restrictToAuthenticated()
      ]
    });

  app.service('/totals/from', { find: totalsFrom })
    .before({
      all: [
        auth.verifyToken(),
        auth.populateUser(),
        auth.restrictToAuthenticated()
      ]
    });

  app.service('/totals', new Service({ Model: require('./model') }))
    .before({ all: auth.verifyToken() });

};
