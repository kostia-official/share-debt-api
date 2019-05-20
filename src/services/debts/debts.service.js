const createService = require('feathers-mongoose');
const Model = require('./debts.model');
const pay = require('./routes/pay');
const hooks = require('./debts.hooks');
const auth = require('@feathersjs/authentication');
const ownTransaction = require('../../hooks/own-transaction');

module.exports = function() {
  const app = this;

  app.use('/debts/pay', { create: pay });
  app.service('/debts/pay').hooks({
    before: {
      create: [auth.hooks.authenticate('jwt'), ownTransaction()]
    }
  });

  app.use('/debts', createService({ Model }));

  app.service('debts').hooks(hooks);
};
