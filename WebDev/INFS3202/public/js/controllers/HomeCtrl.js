angular.module('HomeCtrl', []).controller('HomeController', function($scope, $http, $timeout, $mdSidenav, $log) {


    $scope.heading = "Events Explorer";
    $scope.showDarkTheme = true;
    $scope.imagePath = 'img/review_profile/0.jpg';
    $scope.imagePath2 = 'img/home/explore.jpg';
    $scope.imagePath2_1 = 'img/home/explore2.jpg';
    $scope.imagePath2_2 = 'img/home/explore3-lanczos3.jpg';

    $scope.imagePath3 = 'img/home/review.jpg';
    $scope.imagePath4 = 'img/home/save.jpg';


  })
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('dark-red').backgroundPalette('red').dark();
    $mdThemingProvider.theme('dark-indigo').backgroundPalette('indigo').dark();
    $mdThemingProvider.theme('dark-lime').backgroundPalette('lime').dark();

    $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
    $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
    $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
  });
