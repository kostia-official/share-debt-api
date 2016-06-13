const mongoose = require('mongoose');
const config = require('getconfig');
const serverStatus = require('../helpers/server-status');

const users = require('./users');
const totals = require('./totals');
const debts = require('./debts');

module.exports = function () {
  const app = this;

  mongoose.connect(config.db.url);
  mongoose.Promise = global.Promise;

  app.configure(users);
  app.configure(totals);
  app.configure(debts);

  app.service('/', { find: serverStatus });
};
