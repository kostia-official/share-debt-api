const { request, helpers } = require('./test-env.js');
const _ = require('lodash');

const test = require('ava');
const debt = { amount: 200, name: 'beer' };

const count = 3;

let tokenHeader;
let user;

test.before(async() => {
  user = await helpers.createLoggedInUser();
  tokenHeader = user.tokenHeader;
  debt.to = String(user.id);
  debt.from = _(await Promise.all(_.times(count, () => helpers.createUser())))
    .map(user => user.id).value();
});

test('debt add', async t => {

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

  await request.get('/totals/to')
    .set(...tokenHeader)
    .expect(({ body }) => {
      body.map(({ to }) => t.is(to, String(user.id)));
      t.is(body[0].amount, debt.amount / count * 2);
    })
    .expect(200);

});
