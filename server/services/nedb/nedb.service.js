// Initializes the `nedb` service on path `/nedb`
const createService = require('feathers-nedb');
const createModel = require('../../models/nedb.model');
const hooks = require('./nedb.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'nedb',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/nedb', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('nedb');

  service.hooks(hooks);
};
