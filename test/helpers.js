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
    return _.assign(
      { email: randomString() + '@gmail.com', name: randomString(), password: randomString() },
      user
    );
  }

  function createUser(user) {
    return app.service('users').create(userData(user));
  }

  async function createLoggedInUser(user) {
    const data = userData(user);
    const { _id } = await createUser(data);
    const { accessToken } = (await request.post('/authentication').send(data)).body;
    return {
      _id: String(_id),
      ...data,
      token: accessToken,
      tokenHeader: ['Authorization', accessToken]
    };
  }

  return { createUser, randomString, userData, createLoggedInUser };
};
