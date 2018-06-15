const path = require('path');
const router = require('express').Router();

function requireLogin(req, res, next) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

router.get('/app', requireLogin, function (req, res, next) {
  res.sendFile(path.join(req.app.get('public'), 'app.html'));
});

router.get('/login', function (req, res, next) {
  res.sendFile(path.join(req.app.get('public'), 'login.html'));
});

router.get('/register', function (req, res, next) {
  res.sendFile(path.join(req.app.get('public'), 'index.html'));
});

module.exports = router;
