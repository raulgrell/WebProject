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

const knex = require('./db/knex');
const authentication = require('./authentication');
const services = require('./services');

const app = express(feathers());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

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
app.configure(authentication);
app.configure(services);

// Dynamic Pages
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Static pages
app.use(express.static(app.get('public')));
app.use(express.errorHandler());

// Socket events
app.on('connection', connection => {
    app.channel('anonymous').join(connection);
    console.log('a user connected');
    app.on('disconnect', function() {
        console.log('user disconnected');
    });
});

app.on('login', (authResult, { connection }) => {
    if (connection) {
        const user = connection.user;
        app.channel('anonymous').leave(connection);
        app.channel('authenticated').join(connection);
    }
});

app.publish((data, hook) => {
    console.log('Publishing all events to all authenticated users.');
    return app.channel('authenticated');
});

app.service('/lfg').publish((data, ctx) => {
    console.log('Publishing all events to all anonymous users.');
    return app.channel('anonymous');
});

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
