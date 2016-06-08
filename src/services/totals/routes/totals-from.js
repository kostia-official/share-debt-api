const Total = require('../../totals/model');
const User = require('../../users/model');
const Promise = require('bluebird');

module.exports = async({ from }) => {
  const fromUser = await User.findOne({ _id: from });
  const totals = await Total.find({ from });
  const users = await Promise.map(totals, async total => {
    const toUser = await User.findOne({ id: total.to });
    return { ...total.toObject(), fromName: fromUser.name, toName: toUser.name };
  });
  return users;
};
