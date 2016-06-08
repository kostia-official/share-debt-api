const { request } = require('./test-env.js');
const _ = require('lodash');

const test = require('ava');
const debt = { amount: 200, name: 'beer' };

const User = require('../src/services/users/model');
const Debt = require('../src/services/debts/model');
const Total = require('../src/services/totals/model');

const getName = () => (new Date()).toString();

const count = 3;

test.before(async() => {
  debt.to = (await User.create({})).id;
  debt.from = _(await Promise.all(_.times(count, () => User.create({ name: getName() }))))
    .map(user => user.id).value();
});

test('debt add', async t => {
  t.plan(3);

  await request.post('/debts')
    .send(debt)
    .expect(res => {
      const { body } = res;
      t.truthy(_.isMatch(body, debt));
    })
    .expect(201);
  await request.post('/debts')
    .send(debt)
    .expect(res => {
      const { body } = res;
      t.truthy(_.isMatch(body, debt));
    })
    .expect(201);

  const totalsTo = debt.from.map(from => ({ from, to: debt.to, amount: debt.amount / count * 2 }));

  await request.get(`/totals?to=${debt.to}`)
    .expect(({ body }) => {
      t.truthy(_.isMatch(body, totalsTo));
    })
    .expect(200);

});
