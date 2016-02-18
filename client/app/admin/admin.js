'use strict';

angular.module('cerveceriaApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/admin/edit', {
        templateUrl: 'app/admin/edit.html',
        controller: 'AdminCtrl'
      });
  });
