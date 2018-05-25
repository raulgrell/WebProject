const knex = require('knex');

module.exports = function (app) {
  app.on('connection', connection => {
    app.channel('anonymous').join(connection);
    console.log('a user connected');
    app.on('disconnect', function () {
      console.log('user disconnected');
    });
  });

  app.on('login', (authResult, { connection }) => {
    if (connection) {
      console.log('new connection: ', connection);
      app.channel('anonymous').leave(connection);
      app.channel('authenticated').join(connection);
    }
  });

  app.publish((data, hook) => {
    console.log('Publishing all events to all authenticated users.');
    return app.channel('authenticated');
  });
};
