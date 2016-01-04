'use strict';
(function() {

function ActionController($scope, $http, beers, $location) {
	var self = this;
	this.beers = [];

	$http.get('/api/beers').then(function(response) {
	    $scope.beers = response.data;
	});
  

	$scope.delete = function(thing) {
		$http.delete('/api/beers/' + thing._id);      
    	$scope.beers.splice(this.$index, 1);
    	console.log($scope.beers);
    	alert('Beer deleted successfully');
	};

	$scope.edit = function(beer) {
		//Service to pass beer to beer.controller
    beers.edit(beer);    
    //redirect to beer view.
    $location.url('/beer');
	};
    
}

angular.module('cerveceriaApp')
  .controller('ActionController', ActionController);

}) ();