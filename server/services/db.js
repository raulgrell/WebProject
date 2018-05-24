const knexService = require('feathers-knex');
const encounterModel = require('../models/encounter.model');
const cardModel = require('../models/card.model');
const discoveredModel = require('../models/discovered.model');
const eventModel = require('../models/event.model');
const friendshipModel = require('../models/friendship.model');
const groupModel = require('../models/Group.model');
const locationModel = require('../models/location.model');
const memberModel = require('../models/member.model');
const playerModel = require('../models/player.model');
const playerCardModel = require('../models/playercard.model');

module.exports = function (app) {
  const Model = app.get('knexClient')
  const paginate = app.get('paginate');

  app.use('/api/encounter', knexService({
    Model: encounterModel(app),
    id: 'id_encounter',
    name: 'encounter',
    paginate
  }));

  app.use('/api/card', knexService({
    Model: cardModel(app),
    id: 'id_card',
    name: 'card',
    paginate
  }));

  app.use('/api/discovered', knexService({
    Model: discoveredModel(app),
    id: 'id_discovered',
    name: 'discovered',
    paginate
  }));

  app.use('/api/event', knexService({
    Model: eventModel(app),
    id: 'id_event',
    name: 'event',
    paginate
  }));

  app.use('/api/friendship', knexService({
    Model: friendshipModel(app),
    id: 'id_friendship',
    name: 'friendship',
    paginate
  }));

  app.use('/api/group', knexService({
    Model: groupModel(app),
    id: 'id_group',
    name: 'group',
    paginate
  }));

  app.use('/api/location', knexService({
    Model: locationModel(app),
    id: 'id_location',
    name: 'location',
    paginate
  }));

  app.use('/api/member', knexService({
    Model: memberModel(app),
    id: 'id_member',
    name: 'member',
    paginate
  }));

  app.use('/api/playercard', knexService({
    Model: playerCardModel(app),
    id: 'id_playercard',
    name: 'playercard',
    paginate
  }));
};
