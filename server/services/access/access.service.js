// Initializes the `access` service on path `/access`
const createService = require('./access.class.js');
const hooks = require('./access.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'access',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/access', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('access');

  service.hooks(hooks);
};
