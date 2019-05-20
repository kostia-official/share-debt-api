const { name, version } = require('../../package');

const time = Date.now();

module.exports = (req, res) =>
  res.send({
    name,
    version,
    uptime: Date.now() - time
  });
