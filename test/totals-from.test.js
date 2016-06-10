const { request, helpers } = require('./test-env.js');
const _ = require('lodash');
const test = require('ava');

const User = require('../src/services/users/model');

const getName = () => (new Date()).toString();

const count = 3;
const debt = { amount: 200, name: 'beer' };
const ctx = {};

test.before(async() => {
  const user = await helpers.createLoggedInUser();
  ctx.tokenHeader = user.tokenHeader;
  debt.to = String(user.id);
  debt.from = _(await Promise.all(_.times(count, () => User.create({ name: getName() }))))
    .map(user => user.id).value();
  await request.post('/debts')
    .set(...ctx.tokenHeader)
    .send(debt)
    .expect(201);
});

test('from', async t => {

  // await request.get('/totals/from')
  //   .set(...ctx.tokenHeader)
  //   .expect(({ body }) => {
  //     t.is(body.length, 1);
  //     body.map(user => {
  //       t.truthy(user.fromName);
  //       return t.truthy(user.toName);
  //     });
  //   })
  //   .expect(200);

});
