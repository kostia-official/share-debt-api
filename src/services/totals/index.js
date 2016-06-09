const Service = require('../base-service');
const totalsTo = require('./routes/totals-to');
const totalsFrom = require('./routes/totals-from');
const auth = require('feathers-authentication').hooks;

module.exports = function () {
  const app = this;

  app.service('/totals/to/:to', { find: totalsTo })
    .before({ all: auth.verifyToken() });
  
  app.service('/totals/from/:from', { find: totalsFrom })
    .before({ all: auth.verifyToken() });

  app.service('/totals', new Service({ Model: require('./model') }))
    .before({ all: auth.verifyToken() });

};
