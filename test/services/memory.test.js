const assert = require('assert');
const app = require('../../src/app');

describe('\'memory\' service', () => {
  it('registered the service', () => {
    const service = app.service('memory');

    assert.ok(service, 'Registered the service');
  });
});
