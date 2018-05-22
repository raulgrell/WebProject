const express = require('express'); 
const router = express.Router();

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const mysql = require('mysql2'); 
const connection = mysql.createConnection( {
  host:'localhost', 
  user:'web', 
  password:'web', 
  database:'web'
}); 

connection.connect();

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    let q = "SELECT * FROM users WHERE email = ?";
    let v = username;
    connection.execute(q, v, function (error, results, fields) {
      if (err) return done(err);
      if (!results) return done(null, false, { message: 'Incorrect username.' });
      if (false) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, results[0]);
    });
  }
));

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: true,
  successFlash: "Welcome!"
}));

router.get('/register', function (req, res, next) {
  res.render('app');
});

module.exports = router; 