module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'Event';

  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      return db.schema.createTable(tableName, table => {
        // Attributes
        table.increments('id_event');
        table.string('display_name');
        table.string('description');
        table.timestamps();
      }).then(() => {
        console.log(`Created ${tableName} table`);
        return db(tableName).insert([
          { id_event: 1, display_name: 'Host', description: 'Invite some friends over' },
          { id_event: 2, display_name: 'Visit', description: 'Go see a sight' },
          { id_event: 3, display_name: 'Sports', description: 'Play in a tournament' },
          { id_event: 4, display_name: 'Concert', description: 'Watch a concert' },
          { id_event: 5, display_name: 'Volunteering', description: 'Help people' }
        ]).then((r) => console.log(r)).catch(e => console.log(e));
      }).catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  }).catch( e => console.error(`Error querying ${tableName}`, e));
  
  return db;
};
