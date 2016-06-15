const { name, version } = require('../../package.json');
const runTime = new Date();

module.exports = async() => ({ name, version, uptime: +(new Date()) - +runTime });
