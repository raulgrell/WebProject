const memoryService = require('feathers-memory');

module.exports = function (app) {
  app.use('/api/lfg', memoryService({
    id: 'id_lfg',
    name: 'lfg',
    paginate: false
  }));
  const lfgService = app.service('/api/lfg');
};
