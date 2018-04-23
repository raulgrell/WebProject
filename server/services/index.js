const postgres = require('./postgres/postgres.service.js');
const memory = require('./memory/memory.service.js');
const users = require('./users/users.service.js');
const access = require('./access/access.service.js');
const logger = require('../hooks/logger');

module.exports = function (app) {
  app.configure(users);
  app.configure(postgres);
  app.configure(memory);
  app.configure(access);

  app.hooks({
    before: {
      all: [ logger() ],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    },

    after: {
      all: [ logger() ],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    },

    error: {
      all: [ logger() ],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    }
  });
};