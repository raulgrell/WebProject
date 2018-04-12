const path = require('path');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('winston');

const configuration = require('@feathersjs/configuration');
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const memory = require('feathers-memory');

const knex = require('./knex');

const authentication = require('./authentication');
const services = require('./services');
const middleware = require('./middleware');
const channels = require('./channels');
const appHooks = require('./app.hooks');

const app = express(feathers());

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views')

app.configure(configuration());

// Parse HTTP JSON bodies, URL-encoded parameters and Cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

// Enable REST and Socket APIs
app.configure(express.rest());
app.configure(socketio());

// Enable services
app.configure(authentication);
app.configure(knex);
app.configure(middleware);
app.configure(services);
app.configure(channels);
app.hooks(appHooks);

// Dynamic Pages
const indexRouter = require('./routes/index');
app.use('/pages', indexRouter);

// Live Reload
var livereload = require('easy-livereload');
app.use(livereload({
  watchDirs: [ app.get('public') ],
  port: process.env.LIVERELOAD_PORT || 35729
}));

// Static pages
app.use(express.static(app.get('public')));
app.use(express.errorHandler());

var port = app.get('port');
app.listen(port).on('listening', () => 
  console.log('Server listening on localhost:' + port)
);