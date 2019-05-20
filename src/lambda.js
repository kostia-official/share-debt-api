const serverlessExpress = require('aws-serverless-express');
const app = require('./app');
const debug = require('debug')('app:lambda');

const server = serverlessExpress.createServer(app);

exports.handler = (event, context) => {
  if (event.source === 'aws.events') {
    debug('Lambda was warmed!');
    return context.succeed();
  }

  return serverlessExpress.proxy(server, event, context);
};
