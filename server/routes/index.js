const mysql  = require('mysql2');
const express = require('express');
const router = express.Router();

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'web',
  password : 'web',
  database : 'web'
});

connection.connect();

router.get('/discovered/player/:id', function(req, res, next) {
  connection.execute(
    'SELECT * FROM discovered WHERE id_player = ?',
    [req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      console.log("Results: ", results);
      res.render('index', { title: 'Hello', results: JSON.stringify(results) });
    }
  );
});

module.exports = router;
