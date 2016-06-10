const errors = require('feathers-errors');

module.exports = () => async(hook) => {
  const { data: { from, to }, params } = hook;
  const id = String(params.user.id);
  const isOwnTransaction = String(from) === id || String(to) === id;

  if (!isOwnTransaction) throw new errors.NotAuthenticated('You can pay only your debts!');

  return hook;
};
