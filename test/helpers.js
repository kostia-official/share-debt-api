const User = require('../src/services/users/model');
const _ = require('lodash');

function randomString(length = 10) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  return _(length)
    .times(() => possible.charAt(Math.floor(Math.random() * possible.length)))
    .join('');
}

function userData() {
  return { email: randomString(), name: randomString(), password: randomString() };
}

function createUser() {
  return User.create(userData());
}

module.exports = { createUser, randomString, userData };
