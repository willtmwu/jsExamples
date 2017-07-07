var EventsModel = require('../models/Events.js');

var isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  //res.redirect('/login');
  res.status(401).location('/login').end();
}

module.exports = function(app) {

  // Search and filter for user events
  app.post('/api/search-events', isAuthenticated, function(request, response) {

    // Grab all of the query parameters from the body.
    var lat = request.body.latitude;
    var long = request.body.longitude;
    var distance = request.body.distance;

    // Opens a generic Mongoose Query. Depending on the post body we will...
    var query = EventsModel.find({});

    // ...include filter by Max Distance (converting miles to meters)
    if (distance) {
      // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
      query = query.where('location').near({
        center: {
          type: 'Point',
          coordinates: [long, lat]
        },
        // Converting meters to miles. Specifying spherical geometry (for globe)
        maxDistance: distance * 1609.34,
        spherical: true
      });
    }

    queary.where(profile_id).equals(request.user.fb.id); // TODO check

    // Execute Query and Return the Query Results
    query.exec(function(err, events) {
      if (err) {
        response.send(err);
      } else {
        // If no errors, respond with a JSON of all users that meet the criteria
        response.json(events);
        console.log("EVENTS QUERY: \r\n" + events);
      }
    });
  });


  // Gets saved user events
  app.get('/api/user-events', isAuthenticated, function(request, response) {
    EventsModel.find({
      profile_id: request.user.fb.id
    }, function(err, get) {
      if (err) {
        response.send(err);
      } else {
        response.json(get);
        console.log(request.user.fb.name + " GET USER EVENTS: \r\n" + get);
      }
    });

  });

  // Save an events detail, linking to user
  app.post('/api/save-event', isAuthenticated, function(request, response) {
    var newEvent = new EventsModel({
      profile_id: request.user.fb.id,
      evb_id: request.body.evb_id,
      evb_url: request.body.evb_url,
      name: request.body.name,
      logo_url: request.body.logo_url,
      cost: request.body.cost,
      venue: request.body.venue,
      location: {
        "type": "Point",
        "coordinates": request.body.location.split(',').map(Number)
      }
    });

    newEvent.save(function(err) {
      if (err) {
        response.send(err);
      } else {
        response.json(newEvent);
        console.log(request.user.fb.name + " POST SAVE NEW EVENT: \r\n" + newEvent);
      }
    });

  });


  // Just needs event ID and will reference with user
  app.post('/api/remove-event', isAuthenticated, function(request, response) {
    EventsModel.deleteOne({
      profile_id: request.user.fb.id,
      evb_id: request.body.evb_id
    }, function(err, del) {
      if (err) {
        response.send(err);
      } else {
        response.json(del);
        console.log(request.user.fb.name + " DEL USER EVENT: \r\n" + del);
      }
    });


  });


}
