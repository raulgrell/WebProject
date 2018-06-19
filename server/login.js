const session = require('express-session')
const mysql_session = require('express-mysql-session')
const passport = require('passport')
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

const db = require('./db');

module.exports = function (app) {

  const MySQLStore = mysql_session(session);
  const sessionStore = new MySQLStore({
    createDatabaseTable: true,
    endConnectionOnClose: false
  }, db);

  app.use(session({
    name: "session",
    secret: app.get('authentication').secret,
    store: sessionStore,
    resave: true,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (player, done) {
    done(null, player.id_player);
  });

  passport.deserializeUser(function (id, done) {
    let q = 'SELECT * FROM player WHERE id_player = ?';
    let v = [id];
    db.execute(q, v, function (err, results, fields) {
      if (!results) return done(null, false);
      delete results[0].password;
      return done(null, results[0]);
    });
  });

  app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
  }), function (req, res, next) {
    console.log("logging in: ", req.user);
    const payload = {
      id_player: req.user.id_player
    };
    const token = jwt.sign(payload, app.get('authentication').secret, app.get('authentication').jwt);
    res.cookie('accessToken', token, { maxAge: 24 * 60 * 60, httpOnly: false });
    res.redirect('/app');
  });

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

  passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: app.get('authentication').secret,
    issuer: 'passport',
    audience: '127.0.0.1'
  }, function (payload, done) {
    let q = 'SELECT * FROM player WHERE id_player = ?';
    let v = [payload.id_player];
    db.execute(q, v, function (err, results, fields) {
      if (!results) return done(null, false);
      delete results[0].password;
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
      if (!results) return done(null, false, { message: 'Incorrect login' });
      if (bcrypt.compareSync(password, results[0].password || '')) {
        delete results[0].password;
        return done(null, results[0]);
      }
      return done(null, false, { message: 'Incorrect login' });
    });
  }));

};
