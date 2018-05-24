const path = require('path');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('winston');
var flash = require('connect-flash');

// Feathers
const configuration = require('@feathersjs/configuration');
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const memory = require('feathers-memory');

// Authentication
const session = require('express-session')
const passport = require('passport')

// App
const knex = require('./knex');
const services = require('./services');
const channels = require('./channels');
// const authentication = require('./authentication');

const app = express(feathers());
app.configure(configuration());

// Views
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

// Parse JSON, URL-encoded parameters and Cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

app.use(session({
  secret: app.get('authentication').secret,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Enable REST and Socket APIs
app.configure(express.rest());
app.configure(socketio());

// Enable services
app.configure(knex);
// app.configure(authentication);
app.configure(services);
app.configure(channels);

// Game Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Auth Routes
const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

// Static resources
app.use(express.static(app.get('public')));
app.use(express.errorHandler());

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