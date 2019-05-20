const _ = require('lodash');

module.exports = function skipOwnPay(debt) {
  _.map(debt.from, (from) => {
    if (debt.to === from) {
      debt.amount -= debt.amount / debt.from.length;
      debt.from = _.without(debt.from, from);
    }
  });
  return debt;
};
