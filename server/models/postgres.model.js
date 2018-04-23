// postgres-model.js - A KnexJS Model
// See http://knexjs.org/

module.exports = function (app) {
  
  const db = app.get('knexClient');
  const tableName = 'postgres';

  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.string('text');
      }).then(() => {
        console.log(`Created ${tableName} table`);
        db(tableName).insert([
            {name: "A", description: "A"},
            {name: "D", description: "DDDD"}
        ]).then( (r) => console.log(r))
        .catch( err => console.log(err));
      }).catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });
  
  return db;
};
