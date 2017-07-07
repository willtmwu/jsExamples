'use strict'

var mongoose = require('mongoose');

module.exports = mongoose.model('ReviewModel', {
  author: {
    type: String,
    default: 'Anonymous',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    default: '',
    required: true
  },
  comment: {
    type: String,
    default: '',
    required: true
  },
});
