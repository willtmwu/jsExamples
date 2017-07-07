angular.module('ExploreCtrl', []).controller('ExploreController', function($mdMedia, $scope, $http, $timeout, $interval, NgMap) {

  $scope.$watch(function() {
    return $mdMedia('gt-sm');
  }, function(big) {
    $scope.largeScreen = big;
    //console.log(big);
  });


  $scope.selectedEvent = {};
  $scope.showEventDetails = function(evb) {
    $scope.selectedEvent = evb;
  }

  function initMap() {
    NgMap.getMap().then(function(map) {
      console.log(map.getCenter());
      console.log("Finding GEO");

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          google.maps.event.trigger(map, "resize");
          map.setCenter(pos);
          console.log("Location found");
        }, function() {
          handleLocationError(map, true, map.getCenter());
        });
      } else {
        handleLocationError(map, false, map.getCenter());
      }
    });
  }

  function handleLocationError(map, browserHasGeolocation) {
    console.log(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
  }
  initMap();


  $scope.saveEvents = function(user_event) {

    console.log(user_event.name.text);

    var postEventData = {
      evb_id: user_event.id,
      evb_url: user_event.url,
      name: user_event.name.text,
      logo_url: '',
      cost: user_event.is_free,
      venue: user_event.venue.name,
      location: (user_event.venue.longitude + "," + user_event.venue.latitude)
    };

    if (user_event.logo) {
      postEventData.logo_url = user_event.logo.url;
    }

    console.log(postEventData);

    $http({
      method: 'POST',
      url: 'api/save-event',
      data: postEventData
    }).then(function successCallback(response) {
      console.log(response.data);
    }, function errorCallback(response) {
      console.log(response.data);
    });
  };



  // Search Response
  $scope.events_page = {};
  $scope.markers = [];
  $scope.current_event = null; // Selected Marker

  $scope.formData = {};
  $scope.evb_api_url = 'https://www.eventbriteapi.com/v3/events/search/?token=7JPD2XRH5ZAMRWIC3S2D&expand=venue';
  $scope.queryEventbrite = function() {
    //console.log("QUERY");

    var queryParams = {};
    var queryUrl = '' + $scope.evb_api_url;
    //queryParams.location = {};
    if ($scope.formData.keywordSrc) {
      queryParams.q = $scope.formData.keywordSrc;
    }
    if ($scope.formData.radiusSrc) {
      queryUrl += ('&location.within=' + $scope.formData.radiusSrc);
    }
    if ($scope.formData.sortBySrc) {
      queryParams.sort_by = $scope.formData.sortBySrc;
    }
    if ($scope.formData.priceSrc) {
      queryParams.price = $scope.formData.priceSrc;
    }
    if ($scope.formData.categorySrc) {
      queryParams.categories = $scope.formData.categorySrc;
    }

    if ($scope.formData.citySrc) {
      queryUrl += ("&location.address=" + $scope.formData.countrySrc + "--" + $scope.formData.citySrc);
    }

    console.log($scope.formData);
    console.log(queryParams);
    console.log(queryUrl);

    $http({
      method: 'GET',
      url: queryUrl,
      params: queryParams
    }).then(function successCallback(response) {
      if (response.data.events.length > 0) {
        $scope.events_page = response.data;
      } else {
        $scope.events_page = {};
      }

      // Remove all markers
      angular.forEach($scope.markers, function(mkr) {
        mkr.setMap(null);
      });
      $scope.markers = [];

      NgMap.getMap().then(function(current_map) {
        angular.forEach($scope.events_page.events, function(evb) {

          var latlng = new google.maps.LatLng(evb.venue.latitude, evb.venue.longitude);
          var marker = new google.maps.Marker({
            title: evb.name.text,
            position: latlng,
            map: current_map,
            data: evb,
          });

          // Adding click marker listeners
          google.maps.event.addListener(marker, 'click', function(e) {
            console.log("Marker - " + marker.title);
            console.log(marker.data);
            $scope.$apply(function() {
              $scope.current_event = marker.data;
            });

            current_map.panTo(marker.position);

          });


          $scope.markers.push(marker);
        });
      });


      $scope.selectedTabIndex = 1;
      console.log(response.data);
    }, function errorCallback(response) {
      console.log(response.data);
    });
  }





  // Search Form
  $scope.event_category = [{
      name: 'Business',
      id: 101
    },
    {
      name: 'Science & Tech',
      id: 102
    },
    {
      name: 'Food & Drink',
      id: 110
    },
    {
      name: 'Music',
      id: 103
    },
    {
      name: 'Film & Media',
      id: 104
    },
    {
      name: 'Government',
      id: 112
    },
    {
      name: 'Other',
      id: 199
    },
  ]
  $scope.event_price = ['free', 'paid'];
  $scope.sort_by = ['date', 'distance', 'best'];
  $scope.search_radius = ['1km', '10km', '50km', '100km', '200km', '500km', '1000km'];
  $scope.countries = [{
      name: 'USA',
      states: [{
          name: 'Alabama',
          cities: ['Montgomery', 'Birmingham']
        },
        {
          name: 'California',
          cities: ['Sacramento', 'Fremont']
        },
        {
          name: 'Illinois',
          cities: ['Springfield', 'Chicago']
        }
      ]
    },
    {
      name: 'India',
      states: [{
          name: 'Maharashtra',
          cities: ['Pune', 'Mumbai', 'Nagpur', 'Akola']
        },
        {
          name: 'Madhya Pradesh',
          cities: ['Indore', 'Bhopal', 'Jabalpur']
        },
        {
          name: 'Rajasthan',
          cities: ['Jaipur', 'Ajmer', 'Jodhpur']
        }
      ]
    },
    {
      name: 'Australia',
      states: [{
          name: 'Queensland',
          cities: ['Brisbane', 'Gold Coast', 'Sunshine Cost']
        },
        {
          name: 'New South Wales',
          cities: ['Sydney']
        },
        {
          name: 'Victoria',
          cities: ['Melbourne']
        }
      ]
    }
  ];
  $scope.stateList = [];
  $scope.getSelectedState = function() {
    //console.log($scope.formData.countrySrc);
    angular.forEach($scope.countries, function(cs) {
      if (cs.name === $scope.formData.countrySrc) {
        $scope.stateList = cs.states;
        $scope.cityList = [];
      }
    });
    //console.log($scope.stateList);
  };
  $scope.cityList = [];
  $scope.getSelectedCity = function() {
    angular.forEach($scope.stateList, function(ss) {
      if (ss.name === $scope.stateSrc) {
        $scope.cityList = ss.cities;
      }
    });
    //console.log($scope.cityList);
  };



});
