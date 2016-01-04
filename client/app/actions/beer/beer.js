'use strict';

angular.module('cerveceriaApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/beer', {
        templateUrl: 'app/actions/beer/beer.html',
        controller: 'BeerCtrl'
      });
  });
