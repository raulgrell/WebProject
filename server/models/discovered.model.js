module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'Discovered';

  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      return db.schema.createTable(tableName, table => {
        // Attributes
        table.increments('id_discovered');
        table.integer('id_player');
        table.integer('id_location');
        table.boolean('is_favourite');
        table.boolean('is_visited');
        table.timestamps();
        // Indices
        // table.foreign('id_player').references('id_player').inTable('Player');
        // table.foreign('id_location').references('id_location').inTable('Location');
      }).then(() => {
        console.log(`Created ${tableName} table`);
        return db(tableName).insert([
          {id_discovered: 1, id_player: 1, id_location: 1, is_favourite: true, is_visited: true}
        ]).then((r) => console.log(r)).catch(e => console.log(e));
      }).catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  }).catch( e => console.error(`Error querying ${tableName}`, e));
  
  return db;
};
