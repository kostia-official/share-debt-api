process.env.NODE_ENV = 'test';

import sinon from 'sinon';
import request from 'supertest-promised';
import app from '../src/app';
import helpers from './helpers';

module.exports = { app, sinon, request: request(app), helpers };
