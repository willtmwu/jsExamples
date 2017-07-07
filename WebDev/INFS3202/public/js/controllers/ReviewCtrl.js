angular.module('ReviewCtrl', []).controller('ReviewController', function($scope, $http, $mdToast) {

    $scope.formData = {};
    $scope.reviews = [];

    // Loads on page landing
    $http({
      method: 'GET',
      url: 'api/reviews'
    }).then(function successCallback(response) {
      console.log(response.data);
      var responseJSON = response.data;
      angular.forEach(response.data, function(item) {
        item.picture = (getRandomInt(0, 7) + '.jpg');
        $scope.reviews.push(item);
        console.log(item);
      })
    }, function errorCallback(response) {
      console.log(response.data);
    });

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Submission to api
    $scope.submitReview = function() {
      $http({
        method: 'POST',
        url: 'api/reviews',
        data: $scope.formData
      }).then(function successCallback(response) {
        console.log(response.data);
        response.picture = (getRandomInt(0, 7) + '.jpg');
        //$scope.formData = {};
        //$scope.reviews.push(response.data);
        $scope.showSimpleToast('Review Submitted. Thank you!');
      }, function errorCallback(response) {
        console.log(response.data);
      });
    };


    // Location only works on >=960px media devices
    var last = {
      bottom: true,
      top: false,
      left: false,
      right: true
    };

    $scope.toastPosition = angular.extend({}, last);

    $scope.getToastPosition = function() {
      sanitizePosition();

      return Object.keys($scope.toastPosition)
        .filter(function(pos) {
          return $scope.toastPosition[pos];
        })
        .join(' ');
    };

    function sanitizePosition() {
      var current = $scope.toastPosition;

      if (current.bottom && last.top) current.top = false;
      if (current.top && last.bottom) current.bottom = false;
      if (current.right && last.left) current.left = false;
      if (current.left && last.right) current.right = false;

      last = angular.extend({}, current);
    }

    $scope.showSimpleToast = function(comment) {
      var pinTo = $scope.getToastPosition();

      $mdToast.show(
        $mdToast.simple()
        .textContent(comment)
        .position(pinTo)
        .hideDelay(3000)
      );
    };


  })

  .controller('ToastCtrl', function($scope, $mdToast) {
    $scope.closeToast = function() {
      $mdToast.hide();
    };
  });
