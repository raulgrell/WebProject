const mysql  = require('mysql2');

const connection = mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'palavrapassengraçada12345',
  database:'deckoflife'
});

connection.connect();

module.exports = connection;
