'use strict';

angular.module('cerveceriaApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/actions', {
        templateUrl: 'app/actions/actions.html',
        controller: 'ActionController'
      });
  });
