const mysql  = require('mysql2');

const connection = mysql.createConnection({
  host:'127.0.0.1',
  user:'web',
  password:'web',
  database:'web'
});

connection.connect();

module.exports = connection;
