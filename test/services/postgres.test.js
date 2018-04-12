const assert = require('assert');
const app = require('../../src/app');

describe('\'postgres\' service', () => {
  it('registered the service', () => {
    const service = app.service('postgres');

    assert.ok(service, 'Registered the service');
  });
});
