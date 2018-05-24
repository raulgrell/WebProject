const express = require('express'); 
const bcrypt = require('bcrypt'); 
const router = express.Router();

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const mysql = require('mysql2'); 
const connection = mysql.createConnection( {
  host:'127.0.0.1', 
  user:'web', 
  password:'web', 
  database:'web'
}); 

connection.connect();

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    let q = "SELECT id_player, display_name, description, age FROM users WHERE email = ?";
    let v = email;
    connection.execute(q, v, function (error, results, fields) {
      console.log(results);
      if (err) return done(err);
      if (!results) return done(null, false, { message: 'Incorrect login' });
      if (bcrypt.compareSync(password, results[0].password)) {
        return done(null, results[0]);
      }
      return done(null, false, { message: 'Incorrect login' });
    });
  }
));

router.post('/', passport.authenticate('local-login', {
  successRedirect: '/game.html',
  failureRedirect: '/login.html',
  failureFlash: true,
  successFlash: "Welcome!"
}));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

const saltRounds = 10;
router.post('/register', (req,res,next) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      if (err) throw err;
      let sql = 'INSERT INTO player(display_name, email, password) VALUES (?,?,?);';
      let values = [req.body.display_name, req.body.email, hash]
      connection.execute(sql, values, (error, results, fields)=>{
        if (error) {
          console.log("Insert error: ", error);
          res.redirect('/');
        } else {
          console.log("Results: ", results);
          res.redirect('/login.html');
        }
      });
  });
});

module.exports = router; 