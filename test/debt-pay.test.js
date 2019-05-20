const { request, helpers } = require('./test-env.js');
const _ = require('promdash');
const test = require('ava');

const count = 3;
const debt = { amount: 200, name: 'beer' };
const ctx = {};

test.before(async () => {
  const fromUsers = await _.times(count, helpers.createLoggedInUser);
  ctx.toUser = await helpers.createLoggedInUser();
  ctx.fromUserData = fromUsers[0];
  debt.to = String(ctx.toUser._id);
  debt.from = fromUsers.map(({ _id }) => String(_id));

  return request
    .post('/debts')
    .set(...ctx.toUser.tokenHeader)
    .send(debt)
    .expect(201);
});

test('debt pay', async (t) => {
  t.plan(1);

  const pay = { from: ctx.fromUserData._id, to: debt.to, amount: 10 };

  await request
    .post('/debts/pay')
    .set(...ctx.fromUserData.tokenHeader)
    .send(pay)
    .expect(201);

  await request
    .get(`/totals?to=${pay.to}&from=${ctx.fromUserData._id}`)
    .set(...ctx.fromUserData.tokenHeader)
    .expect(({ body }) => {
      t.is(body[0].amount, debt.amount / count - pay.amount);
    })
    .expect(200);
});

test('not own debt pay', async (t) => {
  const pay = { from: ctx.fromUserData._id, to: debt.from[1], amount: 10 };

  const res = await request
    .post('/debts/pay')
    .set(...ctx.toUser.tokenHeader)
    .send(pay);

  t.is(res.status, 403);
});
