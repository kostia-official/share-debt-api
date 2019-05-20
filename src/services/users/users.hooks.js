const local = require('@feathersjs/authentication-local');
const auth = require('@feathersjs/authentication');
const { restrictToOwner } = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [],
    find: [auth.hooks.authenticate('jwt')],
    get: [auth.hooks.authenticate('jwt')],
    create: [local.hooks.hashPassword()],
    update: [auth.hooks.authenticate('jwt'), restrictToOwner({ ownerField: '_id' })],
    patch: [auth.hooks.authenticate('jwt'), restrictToOwner({ ownerField: '_id' })],
    remove: [auth.hooks.authenticate('jwt'), restrictToOwner({ ownerField: '_id' })]
  },

  after: {
    all: [local.hooks.protect('password')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
