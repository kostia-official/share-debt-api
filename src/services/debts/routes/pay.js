const Total = require('../../totals/totals.model');

module.exports = ({ from, to, amount }) => {
  return Total.findOneAndUpdate({ from, to }, { $inc: { amount: -amount } });
};
