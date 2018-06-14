module.exports = {
  requireLogin: function (req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.redirect('/login');
    }
    next();
  },
  requireUser: function (req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.sendStatus(401);
    }
    next();
  }
}
