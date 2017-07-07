var facebook = require('./facebook.js');
var User = require('../models/User.js');

module.exports = function(passport) {

  // Passport needs to be able to serialize and deserialize users to support persistent login sessions
  passport.serializeUser(function(user, done) {
    console.log('Serializing user: ' + user._id);
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      console.log('Deserializing user:' + user);
      done(err, user);
    });
  });

  facebook(passport);

}
