const memoryService = require('feathers-memory');

module.exports = function (app) {
  app.use('/api/lfg', memoryService({
    name: 'lfg',
    paginate: false
  }));
  const lfgService = app.service('/api/lfg');
};
