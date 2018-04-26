module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'users'
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      return db.schema.createTable(tableName, table => {
        table.increments('id');
        table.string('email').unique();
        table.string('password');
        table.string('googleId');
        table.string('facebookId');
        table.string('githubId');
      })
      .then(() => console.log(`Created ${tableName} table`))
      .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  }).catch( e => console.error(`Error querying ${tableName}`, e));

  return db;
};
