const router = require('express').Router();
const db = require('../db')

function requireAdmin(req, res, next) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.sendStatus(401);
  } else if (!req.user.is_admin) {
    return res.sendStatus(403);
  }
  next();
}

module.exports = router;
