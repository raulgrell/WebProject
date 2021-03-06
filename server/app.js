const path = require('path');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('winston');

// Feathers
const configuration = require('@feathersjs/configuration');
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const memory = require('feathers-memory');

// App
const authentication = require('./authentication');
const knex = require('./knex');
const login = require('./login');
const routes = require('./routes');
const services = require('./services');
const channels = require('./channels');

const app = express(feathers());
app.configure(configuration());

// Parse JSON, URL-encoded parameters and Cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

// Enable REST and Socket APIs
app.configure(express.rest());
app.configure(socketio());

// Enable services
app.configure(knex);
app.configure(login);
app.configure(authentication);
app.configure(services);
app.configure(channels);

// Game Routes
app.use('/', routes);

// Static resources
app.use(express.static(app.get('public')));
app.use(express.static(app.get('static')));

// Main
const port = app.get('port');
const host = app.get('host');

app.listen(port).on('listening', () =>
  logger.info('Application started on http://%s:%d', host, port)
);

// Error Reporting
process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

module.exports = app;
