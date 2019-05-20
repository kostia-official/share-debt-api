const Total = require('../../totals/totals.model');
const User = require('../../users/users.model');
const promdash = require('promdash');

module.exports = ({ user }) => {
  return promdash.from(Total.find({ to: user._id })).map(async (total) => {
    const fromUser = await User.findOne({ _id: total.from });
    return { ...total.toObject(), fromName: fromUser.name, toName: user.name };
  });
};
