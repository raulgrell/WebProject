const knex = require('knex');

module.exports = function (app) {
  const driver = app.get('knexDriver');
  const { client, connection } = app.get(driver);
  const db = knex({ client, connection });
  app.set('knexClient', db);
  app.set('mysqlConnection', connection);
};
