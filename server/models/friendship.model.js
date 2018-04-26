module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'Friendship';

  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      return db.schema.createTable(tableName, table => {
        // Attributes
        table.increments('id_friendship');
        table.integer('id_player');
        table.integer('id_friend');
        table.string('text');
        table.timestamps();
        // Indices
        // table.foreign('id_player').references('id_player').inTable('Player');
        // table.foreign('id_friend').references('id_player').inTable('Player');
      }).then(() => {
        console.log(`Created ${tableName} table`);
        return db(tableName).insert([
          {id_friendship: 1, id_player: 1, id_friend: 2, text: ""}
        ]).then((r) => console.log(r)).catch(e => console.log(e));

      }).catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  }).catch( e => console.error(`Error querying ${tableName}`, e));

  return db;
};
