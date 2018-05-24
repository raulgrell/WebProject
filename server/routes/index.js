const mysql  = require('mysql2');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const app = require('../app');

const connection = mysql.createConnection({
  host:'127.0.0.1', 
  user:'web', 
  password:'web', 
  database:'web'
});

connection.connect(); 

//Friendships
router.get('/friends/:id', function (req, res, next) {
  connection.execute(`
    SELECT 
      friendship.id_friendship, 
      friendship.id_player, 
      player_one.display_name as player_name, 
      friendship.id_friend, 
      player_two.display_name as friend_name
     FROM friendship 
     INNER JOIN player AS player_one ON (friendship.id_player = player_one.id_player)
     INNER JOIN player AS player_two ON (friendship.id_friend = player_two.id_player)WHERE friendship.id_player = ?`, 
    [req.params.id], 
    function (error, results, fields) {
      if (error)throw error; 
      console.log('Results: ', results); 
      res.send(results); 
    }); 
});

router.post('/friends/:player_id/:friend_id', function (req, res, next) {
  connection.execute(
    `INSERT INTO friendship (id_player, id_friend) VALUES (?, ?)`,
    [req.params.player_id, req.params.friend_id], 
    function (error, results, fields) {
      if (error) {
        console.log("Insert error: ", error);
        res.sendStatus(500);
      } else {
        console.log("Results: ", results);
        res.sendStatus(200);
      }
    }
  );
});

// All Discovered Locations by id_player
router.get('/player/locations/:id', function (req, res, next) {
  const q = `
    SELECT
      location.* 
    FROM discovered
      INNER JOIN location   ON location.id_location = discovered.id_location
    WHERE discovered.id_player = ?; 
  `; 
  connection.execute(q, [req.params.id], function (error, results, fields) {
    if (error)throw error; 
    console.log('Results: ', results); 
    res.send(results); 
  }); 
}); 

// Favourite location by id_player
router.get('/player/favourites/:id_player', function (req, res, next) {
  const q = `
    SELECT
      location.*
    FROM discovered
      INNER JOIN location ON location.id_location = discovered.id_location
    WHERE discovered.id_player = ? AND discovered.is_favourite = TRUE;
  `; 
  connection.execute(q, [req.params.id_player], function (error, results, fields) {
    if (error)throw error; 
    console.log('Results: ', results); 
    res.send(results); 
  }); 
}); 

// All Available Locations by id_player
router.get('/player/deck/:id', function (req, res, next) {
  const q = `
    WITH discovered_locations AS (
      SELECT id_location
      FROM discovered
      WHERE id_player = ?)
    SELECT 
      location.* 
    FROM location
    INNER JOIN discovered_locations
      ON location.id_parent = discovered_locations.id_location; 
  `; 
  connection.execute(q, [req.params.id], function (error, results, fields) {
    if (error)throw error; 
    console.log('Results: ', results); 
    res.send(results); 
  }); 
}); 

// All cards played by user by id_player
router.get('/player/history/:id', function (req, res, next) {
  const q = `
    SELECT
      card.* , 
      player.display_name   AS player_display_name, 
      location.display_name AS location_display_name
    FROM playercard
      INNER JOIN player ON player.id_player = playercard.id_player
      INNER JOIN card ON card.id_card = playercard.id_card
      INNER JOIN location ON location.id_location = card.id_location
    WHERE
      player.id_player = 1 AND
      playercard.state = 'Played'; 
  `; 
  connection.execute(q, [req.params.id], function (error, results, fields) {
    if (error)throw error; 
    console.log('Results: ', results); 
    res.send(results); 
  }); 
}); 

// All cards in hand by id_player
router.get('/player/hand/:id', function (req, res, next) {
  const q = `
    SELECT
      playercard.* , 
      card.* , 
      location.display_name AS location_display_name
    FROM playercard
      INNER JOIN card ON card.id_card = playercard.id_card
      INNER JOIN location ON location.id_location = card.id_location
    WHERE
      playercard.id_player = 1 AND
      playercard.state = 'New'; 
  `; 
  connection.execute(q, [req.params.id], function (error, results, fields) {
    if (error)throw error; 
    console.log('Results: ', results); 
    res.send(results); 
  }); 
}); 

// Deal a card
router.post('/state/dealCard/', function (req, res, next) {
  const q = `
    INSERT INTO playercard (id_card, id_player, id_group, state)
    WITH discovered_locations AS (
        SELECT id_location, id_player
        FROM discovered
        WHERE id_player = ? AND is_visited = TRUE), available_cards AS (
        SELECT card.id_card, discovered_locations.id_player
        FROM discovered_locations
          LEFT JOIN card ON discovered_locations.id_location = card.id_location)
    SELECT
      available_cards.id_card, 
      available_cards.id_player, 
      NULL AS id_group, 
      'New' AS state from available_cards
    ORDER BY RAND() LIMIT 1;
   `; 
  connection.execute(q, [req.body.id_player], function (error, results, fields) {
    if (error)throw error; 
    const qq =  `
      SELECT *
      FROM playercard
      INNER JOIN card ON card.id_card = playercard.id_card
      WHERE id_playercard = LAST_INSERT_ID()`;
    connection.execute(qq, function(error, results, fields) {
      if (error) throw error;
      console.log('Results: ', results[0]); 
      res.send(results[0]); 
    });
  }); 
}); 

router.post('/state/dropCard/:id', function (req, res, next) {
  const q = `
    UPDATE playercard
      SET state = 'Discarded'
    WHERE id_playercard = ?; 
  `; 
  connection.execute(q, [req.params.id], function (error, results, fields) {
    if (error)throw error; 
    console.log('Results: ', results); 
    res.send(results); 
  }); 
}); 

router.post('/state/playCard', function (req, res, next) {
  const q = `
    UPDATE playercard
      SET state = 'Played'
    WHERE id_playercard = ?; 
  `; 
  console.log('Playing card: ', req.body); 
  connection.execute(q, [req.body.id_playercard], function (error, results, fields) {
    if (error)throw error; 
    console.log('Played card: ', results); 
    res.send(results); 
  }); 
}); 

module.exports = router; 
