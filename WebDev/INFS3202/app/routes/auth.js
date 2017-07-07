var express = require('express');
var router = express.Router();

module.exports = function(passport) {

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  router.get('/auth/facebook',
    passport.authenticate('facebook'));

  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/saved-events',
      failureRedirect: '/'
    })
  );

  return router;
}
