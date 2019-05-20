const users = require('./users/users.service');
const totals = require('./totals/totals.service');
const debts = require('./debts/debts.service');

module.exports = function(app) {
  app.configure(users);
  app.configure(totals);
  app.configure(debts);
};
