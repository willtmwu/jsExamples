//'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  profile_id: {
    type: String
  },
  evb_id: {
    type: Number,
    required: true
  },
  evb_url: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  logo_url: {
    type: String
  },
  cost: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    default: ''
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [Number]
  }, // [Long, Lat]
});

// Indexes this schema in geoJSON format (critical for running proximity searches)
EventSchema.index({
  location: '2dsphere'
});

module.exports = mongoose.model('EventsModel', EventSchema);
