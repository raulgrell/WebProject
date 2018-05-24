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
      console.log('connection: ', connection);
      const player = connection.player;
      console.log("user logged in:", player);
      app.channel('anonymous').leave(connection);
      app.channel('authenticated').join(connection);
    }
  });

  app.publish((data, hook) => {
    console.log('Publishing all events to all authenticated users.');
    return app.channel('authenticated');
  });

  app.service('/api/lfg').publish((data, ctx) => {
    console.log('Publishing LFG events to all anonymous users.');
    return app.channel('anonymous');
  });
};
