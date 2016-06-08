process.env.NODE_ENV = 'test';

import sinon from 'sinon';
import request from 'supertest-promised';
import app from '../src/app';

exports.request = request(app);
global.app = app;
global.sinon = sinon;
global.ctx = {};

