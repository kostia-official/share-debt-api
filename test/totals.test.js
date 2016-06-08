const { request } = require('./test-env.js');
const _ = require('lodash');
const test = require('ava');

const User = require('../src/services/users/model');

const getName = () => (new Date()).toString();

const count = 3;
const debt = { amount: 200, name: 'beer' };

test.before(async() => {
  debt.to = (await User.create({ name: getName() })).id;
  debt.from = _(await Promise.all(_.times(count, () => User.create({ name: getName() }))))
    .map(user => user.id).value();
  await request.post('/debts').send(debt).expect(201);
});

test('to', async t => {

  await request.get(`/totals/to/${debt.to}`)
    .expect(({ body }) => {
      t.is(body.length, count);
      body.map(user => {
        t.truthy(user.fromName);
        return t.truthy(user.toName);
      });
    })
    .expect(200);

});
