var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const config= require('../config.json');

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/rest/v1/customer',
        failureRedirect: '/auth/login'
        // failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  // req.flash('success_msg', 'You are logged out');
  res.redirect('/auth/login');
});

// passport.use(new LocalStrategy(
//     function(username, password, done) {
//       User.findOne({ username: username }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) {
//           return done(null, false, { message: 'Incorrect username.' });
//         }
//         if (!user.validPassword(password)) {
//           return done(null, false, { message: 'Incorrect password.' });
//         }
//         return done(null, user);
//       });
//     }
//   ));
// app.post('/login',
//   passport.authenticate('local',{
//       successRedirect:'/rest/v1/customer',
//       failureRedirect:'/login',
//       failureFlash:true
//   }),
//   function(req, res) {
//     res.redirect('/users/' + req.user.username);
//   });
module.exports = router;
