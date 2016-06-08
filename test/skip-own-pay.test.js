const test = require('ava');
const skipOwnPay = require('../src/helpers/skip-own-pay');

test('with own', async t => {
  const debt = { amount: 200, name: 'beer', from: ['1', '2', '3', '4'], to: '1' };

  const res = skipOwnPay(debt);

  t.is(res.amount, 150);
  t.deepEqual(res.from, ['2', '3', '4']);
});

test('without own', async t => {
  const debt = { amount: 200, name: 'beer', from: ['1', '2', '3', '4'], to: '5' };

  const res = skipOwnPay(debt);

  t.is(res.amount, debt.amount);
  t.deepEqual(res.from, debt.from);
});
