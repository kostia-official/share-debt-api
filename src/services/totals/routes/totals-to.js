const Total = require('../../totals/model');
const User = require('../../users/model');
const Promise = require('bluebird');

module.exports = async({ to }) => {
  const toUser = await User.findOne({ _id: to });
  const totals = await Total.find({ to });
  const users = await Promise.map(totals, async total => {
    const fromUser = await User.findOne({ id: total.from });
    return { ...total.toObject(), fromName: fromUser.name, toName: toUser.name };
  });
  return users;
};
