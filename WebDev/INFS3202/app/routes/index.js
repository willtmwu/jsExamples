// modules ============================================
var cool = require('cool-ascii-faces');



module.exports = function(app) {

  // Frontend Routes for angular-route requests

  app.get('/cool', function(request, response) {
    response.send(cool());
  });


  app.get('/views/:filename', function(request, response, err) {
    response.sendFile(PROJECT_ROOT + '/public/views/' + request.params.filename);
  });


  app.get('/*', function(request, response, err) {
    response.sendFile(PROJECT_ROOT + '/public/index.html');
  });

};
