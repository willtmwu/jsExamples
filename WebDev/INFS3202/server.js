// Import Modules =================================================
var path = require('path');
var express = require('express');
var expressSession = require('express-session');
var app = express();
var request = require('request');
var mongoose = require('mongoose');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

// Environment configuration ===========================================
global.PROJECT_ROOT = path.resolve(__dirname);
var port = process.env.PORT || 8080;
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

// Express Parsing ===============================================
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

// Passport Configurations ======================================
app.use(expressSession({
  secret: 'secretKey',
  name: 'evbexpSession',
  resave: true,
  saveUninitialized: true,
  signed: true
}));
app.use(passport.initialize());
app.use(passport.session());
require('./app/passport/passport-init.js')(passport);
var authRoutes = require('./app/routes/auth.js')(passport);
app.use('/', authRoutes);

// Express Routes =============================================
require('./app/routes/db_events.js')(app);
require('./app/routes/db_reviews.js')(app);
require('./app/routes/index.js')(app);


// Mongoose Listener Callbacks ================================
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected: ' + process.env.MONGODB_URI);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

// Start app ===================================================
app.listen(port, function() {
  console.log('Server Root: ' + PROJECT_ROOT);
  console.log('Server started: Port', port);
});
/*app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});*/
exports = module.exports = app;
