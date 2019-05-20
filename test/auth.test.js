const test = require('ava');
const { request, helpers } = require('./test-env');

test('sign up', async (t) => {
  const user = helpers.userData();
  await request
    .post('/users')
    .send(user)
    .expect(({ body }) => {
      t.truthy(body._id);
      t.is(body.name, user.name);
      t.is(body.email, user.email);
      t.falsy(body.password);
    })
    .expect(201);
});

test('login user with local strategy', async (t) => {
  const user = helpers.userData();
  await request.post('/users').send(user);
  const { body: authResult } = await request.post('/authentication').send({
    email: user.email,
    password: user.password
  });
  t.truthy(authResult.accessToken);
});

test('should respond with 401 without token', async (t) => {
  // const { tokenHeader } = helpers.createLoggedInUser();
  const res = await request.get('/users');
  // .set(...tokenHeader);
  t.is(res.status, 401);
});

test('should respond successfully with token', async (t) => {
  const { tokenHeader } = await helpers.createLoggedInUser();
  const res = await request.get('/users').set(...tokenHeader);
  t.is(res.status, 200);
});

test('should restrict edit only for own user', async (t) => {
  const intruder = await helpers.createLoggedInUser();
  const user = await helpers.createUser();
  const res = await request
    .patch(`/users/${user._id}`)
    .set(...intruder.tokenHeader)
    .send({ name: 'loh' });
  t.is(res.status, 403);
});

test('should allow edit own user', async (t) => {
  const newName = 'Killer3000';
  const user = await helpers.createLoggedInUser();
  const res = await request
    .patch(`/users/${String(user._id)}`)
    .set(...user.tokenHeader)
    .send({ name: newName });
  t.is(res.body.name, newName);
  t.is(res.status, 200);
});
