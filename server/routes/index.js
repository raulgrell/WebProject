const mysql  = require('mysql2');
const express = require('express');
const router = express.Router();

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'palavrapassengraçada12345',
  database : 'deckoflife'
});

connection.connect();

//Friendships

router.get('/friends/:id', function(req, res, next) {
  connection.execute(

    `SELECT friendship.id_friendship, friendship.id_player, player_one.display_name as player_name,friendship.id_friend, player_two.display_name as friend_name
     FROM friendship 
     INNER JOIN player AS player_one ON (friendship.id_player = player_one.id_player)
     INNER JOIN player AS player_two ON (friendship.id_friend = player_two.id_player) WHERE friendship.id_player = ?`,

    [req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      console.log("Results: ", results);
      res.send(results);
    }
  );
});

router.post('/friends/:player_id/:friend_id', function(req, res, next) {
  connection.execute(

    `INSERT INTO friendship(id_player, id_friend) VALUES (?, ?)`,

    [req.params.player_id, req.params.friend_id],
    function (error, results, fields) {
      if (error) throw error;
      console.log("Results: ", results);
      res.send(200);
    }
  );
});

//Discoveres places

router.get('/discovered/player/:id', function(req, res, next) {
  connection.execute(`
    SELECT * FROM discovered WHERE id_player = ?,
  `,[req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      console.log("Results: ", results);
      res.render('index', { title: 'Hello', results: JSON.stringify(results) });
    }
  );
});

router.post('/state/dealCard', function(req, res, next) {
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

router.post('/state/dropCard', function(req, res, next) {
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

router.post('/state/playCard', function(req, res, next) {
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

//display players
router.get('/players/:id', function(req, res, next) {
  connection.execute(
    'SELECT * FROM player where id = ?',
    [req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      console.log("Results: ", results);
      res.render('index', { title: 'Hello', results: JSON.stringify(results) });
    }
  );
});


module.exports = router;


