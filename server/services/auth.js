const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;

const KnexService = require('feathers-knex');
const PlayerModel = require('../models/player.model');

module.exports = function (app) {
  const paginate = app.get('paginate');

  app.use('/api/player', KnexService({
    Model: PlayerModel(app),
    id: 'id_player',
    name: 'player',
    paginate
  }));

  const service = app.service('api/player');
  service.hooks({
    before: {
      all: [],
      find: [],
      get: [],
      create: [hashPassword(), authenticate('jwt')],
      update: [hashPassword(), authenticate('jwt')],
      patch: [hashPassword(), authenticate('jwt')],
      remove: [authenticate('jwt')]
    },
    after: {
      all: [
        // Always remove password, must be the last hook
        protect('password')
      ],
    }
  });
};
