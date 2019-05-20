const { request, helpers } = require('./test-env.js');
const _ = require('lodash');
const test = require('ava');
const promdash = require('promdash');

const count = 3;
const debt = { amount: 200, name: 'beer' };
const ctx = {};

test.before(async () => {
  const user = await helpers.createLoggedInUser();
  ctx.tokenHeader = user.tokenHeader;
  debt.to = String(user._id);

  debt.from = await promdash.times(count, helpers.createUser).map((user) => user._id);

  await request
    .post('/debts')
    .set(...ctx.tokenHeader)
    .send(debt)
    .expect(201);
});

test('to', async (t) => {
  await request
    .get('/totals/to')
    .set(...ctx.tokenHeader)
    .expect(({ body }) => {
      t.is(body.length, count);
      body.forEach((user) => {
        t.truthy(user.fromName);
        t.truthy(user.toName);
      });
    })
    .expect(200);
});
