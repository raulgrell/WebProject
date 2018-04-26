var express = require('express');
var router = express.Router();


/* Return all cards */
router.get('/', function(req, res, next) {
});


/* Add a new card */
router.post('/', function(req, res, next) {
});


/* Return a single card */
router.get('/:id', function(req, res, next) {
  const card_id = req.params.id;
});


/* Edit a single card */
router.put('/:id', function(req, res, next) {
  const card_id = req.params.id;
});


/* Delete a single card */
router.delete('/:id', function(req, res, next) {
  const card_id = req.params.id;
});


module.exports = router;
