const { authenticate } = require('@feathersjs/authentication').hooks;

class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find(params) {
    return [];
  }

  async get(id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return await Promise.all(data.map(current => this.create(current)));
    }

    return data;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return { id };
  }
}

module.exports = function (app) {
  const paginate = app.get('paginate');

  app.use('/access', new Service({
    name: 'access',
    paginate
  }));

  const service = app.service('access');

  service.hooks({
    before: {
      all: [authenticate('jwt')],
    },
  });
};
