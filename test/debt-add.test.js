const { request, helpers } = require('./test-env.js');
const _ = require('lodash');

const test = require('ava');
const debt = { amount: 200, name: 'beer' };

const count = 3;
let tokenHeader;

test.before(async() => {
  const user = await helpers.createLoggedInUser();
  tokenHeader = user.tokenHeader;
  debt.to = String(user.id);
  debt.from = _(await Promise.all(_.times(count, () => helpers.createUser())))
    .map(user => user.id).value();
});

test('debt add', async t => {
  t.plan(3);

  await request.post('/debts')
    .set(...tokenHeader)
    .send(debt)
    .expect(({ body }) => {
      t.truthy(_.isMatch(body, debt));
    })
    .expect(201);
  
  await request.post('/debts')
    .set(...tokenHeader)
    .send(debt)
    .expect(({ body }) => {
      t.truthy(_.isMatch(body, debt));
    })
    .expect(201);

  await request.get(`/totals/to/${debt.to}`)
    .set(...tokenHeader)
    .expect(({ body }) => {
      t.is(body[0].amount, debt.amount / count * 2);
    })
    .expect(200);

});
