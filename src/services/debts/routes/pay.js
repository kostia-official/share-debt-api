const Total = require('../../totals/model');

module.exports = async({ from, to, amount }) => {
  return await Total.findOneAndUpdate({ from, to }, { $inc: { amount: -amount } });
};
