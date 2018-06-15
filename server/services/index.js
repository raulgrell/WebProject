const auth = require('./auth.js');
const db = require('./db.js');
const memory = require('./memory.js');
const game = require('./game.js');

const logger = require('../hooks/logger');

module.exports = function (app) {
  app.configure(auth);
  app.configure(db);
  app.configure(memory);
  app.configure(game);

  app.hooks({
    error: {
      all: [logger()]
    }
  });
};
