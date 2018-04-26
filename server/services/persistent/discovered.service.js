const createService = require('feathers-knex');
const createModel = require('../../models/discovered.model');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    id: 'id_discovered',
    name: 'discovered',
    Model,
    paginate
  };

  app.use('/discovered', createService(options));

  const service = app.service('discovered');

  service.hooks({
    before: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    },

    after: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    },

    error: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    }
  });
};
