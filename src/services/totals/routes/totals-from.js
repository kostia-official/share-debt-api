const Total = require('../../totals/model');
const User = require('../../users/model');
const Promise = require('bluebird');

module.exports = async({ user }) => {
  console.log(user);
  const totals = await Total.find({ from: user.id });
  console.log(totals);
  const users = await Promise.map(totals, async total => {
    const toUser = await User.findOne({ id: total.to });
    return { ...total.toObject(), fromName: user.name, toName: toUser.name };
  });
  return users;
};
