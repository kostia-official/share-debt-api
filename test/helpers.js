const _ = require('lodash');

module.exports = (app) => {
  const request = require('supertest-promised')(app);

  function randomString(length = 10) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    return _(length)
      .times(() => possible.charAt(Math.floor(Math.random() * possible.length)))
      .join('');
  }

  function userData(user) {
    return _.assign({ email: randomString() + '@gmail.com', name: randomString(), password: randomString() }, user);
  }

  function createUser(user) {
    return app.service('users').create(userData(user));
  }

  async function createLoggedInUser(user) {
    const data = userData(user);
    const a = await createUser(data);
    const { token } = (await request.post('/auth/local').send(data)).body;
    return { ...a.toObject(), token, tokenHeader: ['Authorization', token] };
  }

  return { createUser, randomString, userData, createLoggedInUser };
};
