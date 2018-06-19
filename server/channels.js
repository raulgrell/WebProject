const knex = require('knex');

module.exports = function (app) {
  app.on('connection', connection => {
    app.channel('anonymous').join(connection);
    console.log('a new user connected');
    app.on('disconnect', function () {
      console.log('user disconnected');
    });
  });

  app.on('login', (authResult, { connection }) => {
    if (connection) {
      app.channel('anonymous').leave(connection);
      app.channel('authenticated').join(connection);
      console.log("new connection: ", connection);
    }
  });

  app.publish((data, hook) => {
    console.log('Event data:', data)
    return app.channel('authenticated');
  });
};
