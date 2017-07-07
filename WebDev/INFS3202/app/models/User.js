var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
  fb: {
    id: String,
    access_token: String,
    name: String
  },
  twitter: {
    id: String,
    token: String,
    username: String,
    displayName: String,
    lastStatus: String
  }

});
