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
});

test.before(() => request
  .post('/debts')
  .send(debt)
  .set(...ctx.tokenHeader)
  .expect(201)
);

test('debt pay', async t => {
  t.plan(1);

  const pay = { from: debt.from[0], to: debt.to, amount: 10 };

  await request.post('/debts/pay')
    .set(...ctx.tokenHeader)
    .send(pay)
    .expect(201);

  await request.get(`/totals?to=${pay.to}&from=${pay.from}`)
    .set(...ctx.tokenHeader)
    .expect(({ body }) => {
      t.is(body[0].amount, debt.amount / count - pay.amount);
    })
    .expect(200);

});

test('not own debt pay', async() => {

  const pay = { from: debt.from[0], to: debt.from[1], amount: 10 };

  await request.post('/debts/pay')
    .set(...ctx.tokenHeader)
    .send(pay)
    .expect(401);

});
