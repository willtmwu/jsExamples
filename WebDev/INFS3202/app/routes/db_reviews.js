var ReviewModel = require('../models/Review.js');


module.exports = function(app) {
  app.get('/api/reviews', function(request, response) {
    ReviewModel.find(function(err, get) {
      if (err) {
        response.send(err);
      } else {
        response.json(get);
        console.log("GET REVIEWS: \r\n" + get);
      }
    });
  });


  app.post('/api/reviews', function(request, response) {
    ReviewModel.create(request.body, function(err, post) {
      if (err) {
        response.send(err);
      } else {
        response.json(post);
        console.log("POST REVIEWS: \r\n" + post);
      }
    });
  });

}
