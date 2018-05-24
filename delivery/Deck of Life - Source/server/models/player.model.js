module.exports = function (app) {
  
  const db = app.get('knexClient');
  const tableName = 'Player';

  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      return db.schema.createTable(tableName, table => {
        // Atributes
        table.increments('id_player');
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.string('display_name').notNullable();
        table.string('description');
        table.integer('age');
        table.timestamps();
      }).then(() => {
        console.log(`Created ${tableName} table`);
        return db(tableName).insert([
          { id_player: 1, display_name: 'Raul',   age: 27, description: 'I like pizzas' },
          { id_player: 2, display_name: 'Pedro',  age: 20, description: 'I like pies' },
          { id_player: 3, display_name: 'Noddy',  age: 8, description: 'I like diamonds' },
          { id_player: 4, display_name: 'Freddy', age: 100, description: 'I like knives' }
        ]).then((r) => console.log(r)).catch(e => console.log(e));

      }).catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  }).catch( e => console.error(`Error querying ${tableName}`, e));
  
  return db;
};
