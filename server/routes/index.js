var express = require('express');
var router = express.Router();

/* Return all cards */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello' });
});

module.exports = router;
