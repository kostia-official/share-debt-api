const { request, helpers } = require('./test-env.js');
const _ = require('promdash');
const test = require('ava');

const count = 3;
const debt = { amount: 200, name: 'beer' };

let loggedUser;
let tokenHeader;

test.before(async () => {
  loggedUser = await helpers.createLoggedInUser();
  tokenHeader = loggedUser.tokenHeader;

  debt.to = (await helpers.createUser())._id;
  debt.from = await _.times(count, helpers.createUser)
    .concat(loggedUser)
    .map((user) => user._id);

  await request
    .post('/debts')
    .set(...tokenHeader)
    .send(debt)
    .expect(201);
});

test('from', async (t) => {
  await request
    .get('/totals/from')
    .set(...tokenHeader)
    .expect(({ body }) => {
      t.is(body.length, 1);
      body.map((user) => {
        t.is(user.fromName, loggedUser.name);
        return t.truthy(user.toName);
      });
    })
    .expect(200);
});
