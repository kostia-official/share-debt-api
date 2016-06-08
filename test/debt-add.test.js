const { request, helpers } = require('./test-env.js');
const _ = require('lodash');

const test = require('ava');
const debt = { amount: 200, name: 'beer' };

const count = 3;

test.before(async() => {
  const { email, password } = await helpers.createUser();
  console.log({ email, password });
  const user = (await request.post('/auth/local').send({ email, password })).body;
  console.log(user);
  debt.to = user.id;
  debt.from = _(await Promise.all(_.times(count, () => helpers.createUser())))
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
