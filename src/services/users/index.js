const Service = require('../base-service');
const auth = require('feathers-authentication').hooks;

module.exports = function () {
  const app = this;

  app
    .service('/users', new Service({ Model: require('./model') }))
    .before({
      create: auth.hashPassword({ passwordField: 'password' })
    });

};
