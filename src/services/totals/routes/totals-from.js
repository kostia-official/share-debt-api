const Total = require('../../totals/model');
const User = require('../../users/model');
const Promise = require('bluebird');

module.exports = async({ user }) => {
  const totals = await Total.find({ from: user.id });
  const users = await Promise.map(totals, async total => {
    const toUser = await User.findOne({ id: total.to });
    return { ...total.toObject(), fromName: user.name, toName: toUser.name };
  });
  return users;
};
