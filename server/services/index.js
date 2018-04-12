const postgres = require('./postgres/postgres.service.js');
const nedb = require('./nedb/nedb.service.js');
const memory = require('./memory/memory.service.js');
const users = require('./users/users.service.js');
const access = require('./access/access.service.js');

module.exports = function (app) {
  app.configure(postgres);
  app.configure(nedb);
  app.configure(memory);
  app.configure(users);
  app.configure(access);
};
