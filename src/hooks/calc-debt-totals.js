const Total = require('../services/totals/model');
const _ = require('lodash');
const skipOwnPay = require('../helpers/skip-own-pay');

module.exports = () => async(hook) => {
  const debt = skipOwnPay(hook.result);

  const amount = debt.amount / debt.from.length;

  await Promise.all(_.map(debt.from, async from => {
    const before = await Total.findOne({ from, to: debt.to });

    return !before ?
      await Total.create({ from, to: debt.to, amount }) :
      await Total.findOneAndUpdate({ from, to: debt.to }, { amount: before.amount + amount });
  }));

  return hook;
};
