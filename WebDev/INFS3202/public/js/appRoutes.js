angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider

    // home page
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    })

    .when('/explore', {
      templateUrl: 'views/explore.html',
      controller: 'ExploreController'
    })

    .when('/help', {
      templateUrl: 'views/help.html',
      controller: 'HelpController'
    })

    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    })

    .when('/saved-events', {
      templateUrl: 'views/saved-events.html',
      controller: 'SavedEventsController'
    })

    .when('/review', {
      templateUrl: 'views/review.html',
      controller: 'ReviewController'
    })

    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);

}]);
