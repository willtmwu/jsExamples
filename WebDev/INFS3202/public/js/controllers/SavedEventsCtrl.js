angular.module('SavedEventsCtrl', []).controller('SavedEventsController', function($scope, $http, $location, $window) {

  $scope.heading = "SAVED EVENTS";
  $scope.user_events = [];
  //$scope.currentPage = $location.path;

  $http({
    method: 'GET',
    url: 'api/user-events'
  }).then(function successCallback(response) {
    //$location.url(response.data);
    console.log(response.data);
    $scope.user_events = response.data;
    /*angular.forEach(response.data, function(item){
                   console.log(item);
		 $scope.reviews.push(item);
               })*/
  }, function errorCallback(response) {
    console.log(response.data);
    if (response.status == 401) {
      $window.location.href = '/login';
    }
  });



  $scope.removeEvents = function(user_event) {

    console.log(user_event);

    var postEventData = {
      evb_id: user_event.evb_id,
    };


    $http({
      method: 'POST',
      url: 'api/remove-event',
      data: postEventData
    }).then(function successCallback(response) {
      console.log(response.data);
      var index = $scope.user_events.indexOf(user_event);
      $scope.user_events.splice(index, 1);
    }, function errorCallback(response) {
      console.log(response.data);
    });
  };





});
