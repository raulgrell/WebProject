module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'Member';

  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      return db.schema.createTable(tableName, table => {
        // Attributes
        table.increments('id_member');
        table.integer('id_group');
        table.integer('id_player');
        // Keys
        // table.foreign('id_group').references('id_group').inTable('Group');
        // table.foreign('id_player').references('id_player').inTable('Player');
      }).then(() => {
        console.log(`Created ${tableName} table`);
        return db(tableName).insert().then((r) => console.log(r)).catch(e => console.log(e));
      }).catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  }).catch( e => console.error(`Error querying ${tableName}`, e));
  
  return db;
};

