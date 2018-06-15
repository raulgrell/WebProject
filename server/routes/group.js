const router = require('express').Router();
const db = require('../db')

function requireUser(req, res, next) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.sendStatus(401);
  }
  next();
}

// Player
router.get('/', requireUser, function (req, res, next) {
  db.execute(`
    SELECT * FROM group
  `, [req.user.id_player],
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
});

router.get('/:id_group', requireUser, function (req, res, next) {
  db.execute(`
    SELECT * FROM group
  `, [req.user.id_player],
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
});

router.post('/join/:id_group', requireUser, function (req, res, next) {
  db.execute(`
    SELECT * FROM group
  `, [req.user.id_player],
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
});

router.post('/leave/:id_group/', requireUser, function (req, res, next) {
  db.execute(`
    SELECT * FROM group
  `, [req.user.id_player],
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
});

router.post('/playCard/', requireUser, function (req, res, next) {
  db.execute(`
    SELECT * FROM group
  `, [req.user.id_player],
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
});

router.post('/disband/', requireUser, function (req, res, next) {
  db.execute(`
    SELECT * FROM group
  `, [req.user.id_player],
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
});

module.exports = router;
