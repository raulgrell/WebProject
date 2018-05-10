module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'PlayerUser';

  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      return db.schema.createTable(tableName, table => {
        // Attributes
        table.increments('id_user');
        table.integer('id_player');
        table.string('email').unique();
        table.string('password');
        table.string('googleId');
        table.string('facebookId');
        table.string('githubId');
        // Indices
        // table.foreign('id_player').references('id_player').inTable('player');
      }).then(() => {
        console.log(`Created ${tableName} table`);
        return db(tableName).insert().then((r) => console.log(r)).catch(e => console.log(e));
      }).catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  }).catch( e => console.error(`Error querying ${tableName}`, e));
  
  return db;
};

