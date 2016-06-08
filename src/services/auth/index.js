const auth = require('feathers-authentication');

module.exports = function () {
  const app = this;
  app.configure(auth({ idField: 'id' }));
};
