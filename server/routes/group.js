var express = require('express');
var router = express.Router();

/* Return all cards */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello' });
});


/* Add a new card */
router.post('/', function(req, res, next) {
  res.render('index', { title: 'Hello' });
});


/* Return a single card */
router.get('/:id', function(req, res, next) {
  const card_id = req.params.id;
  res.render('index', { title: 'Hello' });
});


/* Edit a single card */
router.put('/:id', function(req, res, next) {
  const card_id = req.params.id;
  res.render('index', { title: 'Hello' });
});


/* Delete a single card */
router.delete('/:id', function(req, res, next) {
  const card_id = req.params.id;
  res.render('index', { title: 'Hello' });
});


module.exports = router;
