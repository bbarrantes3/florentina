'use strict';

angular.module('cerveceriaApp')
  .controller('BeerCtrl', function($scope, $http, User, Auth, beers, $location) {
    var beer_data = beers.list;
    
    $scope.errors = {};
    $scope.beeredit = '0';
    if(beer_data.length > 0) {
      $scope.beerid = beer_data[0].id;
      $scope.beername = beer_data[0].name;
      $scope.beerinfo = beer_data[0].info;
      $scope.beeredit = '1';
    }
    
    
    $scope.submit = function() {
      if ($scope.beername && $scope.beerinfo) {
        if(this.beeredit === '1') {
          //A beer needs to be updated
          $http.put('/api/beers/'+this.beerid, 
          { name: $scope.beername, info: $scope.beerinfo }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.beername = '';
            $scope.beerinfo = '';
            $scope.beerid = '';
            $scope.beeredit = '0';
            alert('Beer updated successfully!');
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert(response);
          });
        } else {
          //A beer needs to be inserted
          $http.post('/api/beers',
          { name: this.beername, info: this.beerinfo }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.beername = '';
            $scope.beerinfo = '';
            alert('Beer created successfully!');
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert(response);
          });
        }
      } else {
        alert('Provide Beer name and info before submitting.');
      }
      //clean beer list at service
      beers.clean();
      $location.url('/actions');
    };

    $scope.getbeers = function() {
      //console.log(beer_data);
      var x = new Date().toLocaleString('en-US', { timeZone: 'America/Costa_Rica' });
      console.log(x);

      //$scope.beername = beer_data[0].name;
      //$scope.beerinfo = beer_data[0].info;
      //console.log(beers.list);
      /* 
      console.log('testing pull all beers');

      $http.get('/api/beers').then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log(response);
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert(response);
        });;*/

    };
    
  });
