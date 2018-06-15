const path = require('path');
const session = require('express-session')
const passport = require('passport')
const bcrypt = require('bcrypt');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

const db = require('./db');

module.exports = function (app) {

  app.use(session({
    secret: app.get('authentication').secret,
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (player, done) {
    done(null, player.id_player);
  });

  passport.deserializeUser(function (id, done) {
    let q = 'SELECT id_player, display_name, description, age FROM player WHERE id_player = ?';
    let v = [id];
    db.execute(q, v, function (err, results, fields) {
      if (!results) return done(null, false);
      return done(null, results[0]);
    });
  });

  passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: app.get('authentication').secret,
    issuer: '127.0.0.1',
    audience: '127.0.0.1'
  }, function (payload, done) {
    let q = 'SELECT id_player, display_name, description, age FROM player WHERE id_player = ?';
    let v = [payload.id_player];
    db.execute(q, v, function (err, results, fields) {
      if (!results) return done(null, false);
      return done(null, results[0]);
    });
  }));

  passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function (email, password, done) {
    let q = 'SELECT * FROM player WHERE email LIKE ?';
    let v = [email];
    db.execute(q, v, function (err, results, fields) {
      if (err) return done(err);
      if (results.length == 0) return done(null, false, { message: 'Incorrect login' });
      if (bcrypt.compareSync(password, results[0].password || '')) {
        delete results[0].password;
        return done(null, results[0]);
      }
      return done(null, false, { message: 'Incorrect login' });
    });
  }));

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/app',
    failureRedirect: '/login',
  }));

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  const saltRounds = 10;
  app.post('/register', (req, res, next) => {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      if (err) throw err;
      let sql = 'INSERT INTO player (display_name, email, password) VALUES (?,?,?);';
      let values = [req.body.display_name, req.body.email, hash]
      db.execute(sql, values, (error, results, fields) => {
        if (error) {
          console.log('Insert error: ', error);
          res.redirect('/');
        } else {
          console.log('Results: ', results);
          res.redirect('/login');
        }
      });
    });
  });
};
