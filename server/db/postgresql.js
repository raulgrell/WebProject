const { Client } = require('pg');

// const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'
// const client = new Client({ connectionString: connectionString, })

const client = new Client({
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: 'secretpassword',
  port: 3211,
})

client.connect()

const res = await client.query('SELECT $1::text as message', ['Hello world!']);
console.log(res.rows[0].message);

const query = {
  text: 'INSERT INTO users(name, email) VALUES($1, $2)',
  values: ['brianc', 'brian.m.carlson@gmail.com'],
}

const prepared_statement = {
  name: 'fetch-user',
  text: 'SELECT * FROM user WHERE id = $1',
  values: [1]
}

// promise
client.query(query)
  .then(res => console.log(res.rows[0]))
  .catch(e => console.error(e.stack))

await client.end()