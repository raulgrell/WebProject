module.exports = function (app) {
  
  const db = app.get('knexClient');
  const tableName = 'PlayerCard';

  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      return db.schema.createTable(tableName, table => {
        // Atributes
        table.increments('id_playercard');
        table.integer('id_card');
        table.integer('id_player');
        table.integer('id_group');
        table.boolean('is_played');
        // Indices
        table.foreign('id_player').references('id_player').inTable('player');
        table.foreign('id_player').references('id_group').inTable('group');
      }).then(() => {
        console.log(`Created ${tableName} table`);
        return db(tableName).insert([
          {id_playercard: 1, id_card: 1, id_player: 2, id_group: null, is_played: false}
        ]).then(r => console.log(r)).catch(e => console.log(e));
      }).catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  }).catch( e => console.error(`Error querying ${tableName}`, e));
  
  return db;
};
