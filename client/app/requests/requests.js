'use strict';

angular.module('cerveceriaApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/requests', {
        templateUrl: 'app/requests/requests.html',
        controller: 'RequestController'
      })
      .when('/requests/edit', {
        templateUrl: 'app/requests/edit.html',
        controller: 'RequestController'
      });
  });
