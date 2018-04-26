const attended = require('./persistent/attended.service.js');
const card = require('./persistent/card.service.js');
const discovered = require('./persistent/discovered.service.js');
const event = require('./persistent/event.service.js');
const friendship = require('./persistent/friendship.service.js');
const group = require('./persistent/group.service.js');
const location = require('./persistent/location.service.js');
const member = require('./persistent/member.service.js');
const player = require('./persistent/player.service.js');
const playercard = require('./persistent/playercard.service.js');
const playeruser = require('./persistent/playeruser.service.js');
const users = require('./users/users.service.js');
const access = require('./access/access.service.js');

const memoryService = require('feathers-memory');
const logger = require('../hooks/logger');

module.exports = function (app) {
  app.configure(users);
  app.configure(attended);
  app.configure(card);
  app.configure(discovered);
  app.configure(event);
  app.configure(friendship);
  app.configure(group);
  app.configure(location);
  app.configure(member);
  app.configure(player);
  app.configure(playercard);
  app.configure(playeruser);
  app.configure(access);

  app.use('lfg', memoryService({
    name: 'lfg',
    paginate: false
  }));

  const lfgService = app.service('lfg');
  
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