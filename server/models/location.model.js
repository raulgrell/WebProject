module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'Location';

  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      return db.schema.createTable(tableName, table => {
        // Attributes
        table.increments('id_location');
        table.integer('id_parent');
        table.string('display_name').notNullable();
        table.string('description').notNullable(); 
      }).then(() => {
        console.log(`Created ${tableName} table`);
        return db(tableName).insert([
          { id_location: 1, id_parent: 1, display_name: 'Home', description: 'A Cozy little nook' },
          { id_location: 2, id_parent: 1, display_name: 'Town', description: 'A lively little town' },
          { id_location: 3, id_parent: 2, display_name: 'Park', description: 'A lush, green space' },
          { id_location: 4, id_parent: 2, display_name: 'Library', description: 'A trove of knowledge' },
          { id_location: 5, id_parent: 2, display_name: 'Market', description: 'A bustling atmosphere' }
        ]).then((r) => console.log(r)).catch(e => console.log(e));
      }).catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  }).catch( e => console.error(`Error querying ${tableName}`, e));
  
  return db;
};
