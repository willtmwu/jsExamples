angular.module('VisualiseCtrl', []).controller('VisualiseController', function($scope, $http, $interval, NgMap) {

  $scope.tagline = 'Explore!!!';

  $scope.viz_data = {};


  // Loadings on page landing
  $http({
    method: 'POST',
    url: 'api/viz_data'
  }).then(function successCallback(response) {
    $scope.viz_data = response.data;
    console.log(response.data);
  }, function errorCallback(response) {
    console.log(response.data);
  });

});
