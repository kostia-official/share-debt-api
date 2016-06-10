const Total = require('../../totals/model');
const User = require('../../users/model');
const promdash = require('promdash');

module.exports = ({ user }) => {

  return promdash
    .from(Total.find({ to: user.id }))
    .map(async total => {
      const fromUser = await User.findOne({ id: total.from });
      return { ...total.toObject(), fromName: fromUser.name, toName: user.name };
    });
  
};
