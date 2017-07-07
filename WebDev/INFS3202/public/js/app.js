angular.module('eventsApp', ['ngMaterial', 'ngMessages', 'ngRoute', 'ngMap', 'appRoutes',
    'NavCtrl', 'HomeCtrl', 'ExploreCtrl', 'SavedEventsCtrl', 'LoginCtrl', 'HelpCtrl', 'ReviewCtrl'
  ])

  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default');
    //    .primaryPalette('pink')
    //    .accentPalette('orange');
  });
