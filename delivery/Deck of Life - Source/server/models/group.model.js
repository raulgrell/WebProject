module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'Group';

  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      return db.schema.createTable(tableName, table => {
        // Attributes
        table.increments('id_group');
        table.string('display_name');
      }).then(() => {
        console.log(`Created ${tableName} table`);
        return db(tableName).insert().then((r) => console.log(r)).catch(e => console.log(e));
      }).catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  }).catch( e => console.error(`Error querying ${tableName}`, e));
  
  return db;
};
