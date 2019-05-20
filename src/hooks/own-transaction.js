const { Forbidden } = require('@feathersjs/errors');

module.exports = () => async (hook) => {
  const {
    data: { from, to },
    params
  } = hook;
  const id = String(params.user._id);
  const isOwnTransaction = String(from) === id || String(to) === id;

  if (!isOwnTransaction) throw new Forbidden();
  return hook;
};
