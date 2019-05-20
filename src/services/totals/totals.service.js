const { Service } = require('feathers-mongoose');
const auth = require('@feathersjs/authentication');
const Model = require('./totals.model');
const totalsTo = require('./routes/totals-to');
const totalsFrom = require('./routes/totals-from');

module.exports = function() {
  const app = this;

  app.use('/totals/to', { find: totalsTo });
  app.service('/totals/to').hooks({
    before: { find: [auth.hooks.authenticate('jwt')] }
  });

  app.use('/totals/from', { find: totalsFrom });
  app.service('/totals/from').hooks({
    before: { find: [auth.hooks.authenticate('jwt')] }
  });

  app.use('/totals', new Service({ Model }));
  app.service('/totals').hooks({
    before: { all: [auth.hooks.authenticate('jwt')] }
  });
};
