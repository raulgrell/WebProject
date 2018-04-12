// Initializes the `postgres` service on path `/postgres`
const createService = require('feathers-knex');
const createModel = require('../../models/postgres.model');
const hooks = require('./postgres.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'postgres',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/postgres', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('postgres');

  service.hooks(hooks);
};
