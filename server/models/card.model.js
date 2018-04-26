module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'Card';

  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      return db.schema.createTable(tableName, table => {
        // Attributes
        table.increments('id_card');
        table.integer('id_location');
        table.string('display_name');
        table.string('action');
        table.string('description');
        // Indices
        // table.foreign('id_location').references('id_location').inTable('Location')
      }).then(() => {
        console.log(`Created ${tableName} table`);
        return db(tableName).insert([
          { id_card: 1, id_location: 1, display_name: 'Watch TV',         description: 'Catch up on a series!' },
          { id_card: 2, id_location: 2, display_name: 'Go for a walk',    description: 'Check out the area' },
          { id_card: 3, id_location: 3, display_name: 'Jog in the park',  description: 'Get that blood pumpin' },
          { id_card: 4, id_location: 2, display_name: 'Go to the gym',    description: 'Pump some iron' },
          { id_card: 5, id_location: 3, display_name: '3v3 Basketball',   description: 'Claim the court!' },
          { id_card: 6, id_location: 1, display_name: 'Host a LAN Party', description: 'rek sum n00bs' }
        ]).then((r) => console.log(r)).catch(e => console.log(e));
      }).catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  }).catch( e => console.error(`Error querying ${tableName}`, e));
  
  return db;
};
