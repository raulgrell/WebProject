// Initializes the `memory` service on path `/memory`
const createService = require('feathers-memory');
const hooks = require('./memory.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'memory',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/memory', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('memory');

  service.hooks(hooks);
};
