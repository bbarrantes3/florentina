'use strict';
(function() {

function RequestController($scope, $http, $location, Auth) {
	var self = this;
	//this.beers = [];

	//Get beers to be loaded in a combo box
	$http.get('/api/beers').then(function(response) {
	    $scope.beers = response.data;
	});

	$http.get('/api/requests').then(function(response) {
	    $scope.requests = response.data;
	});	

	$scope.requestnotes = "testing this thing";
	//Get current user
	//console.log(Auth.getCurrentUser());

	// Keg prices
	var kegs =  {
		k5: "50000",
		k8: "80000",
		k12: "120000"
	};

	$scope.submit = function() {
		var user = Auth.getCurrentUser();
		//Calculate price for order, read cost of keg according to size from config file
		var cost = this.quantity * kegs['k'+this.unit];

		/*
		Flow for new request:
		Request inserted into DB with status received [received, confirmed, shipped, fulfilled]

		Request fields:
		1.Total Kegs
		2.Keg size
		3.Beer name
		4.Notes
		5.status
		6.Timestamp
		7.Client Name
		8.Client ID
		9.order price - need to create a collection with keg prices.
		*/
		//Hacer la llamada post al backend, que ya el endpoint creo.
		if($scope.quantity && $scope.unit && $scope.beer_name) {
			var notes = (this.notes === undefined)? "" : this.notes;
			$http.post('/api/requests', 
			{
				total_kegs: this.quantity,
				keg_size: this.unit,
				beer_name: this.beer_name,
				notes: notes,
				status: 'received',
				//timestamp: Date.now,
				client_name: user.client_name,
				client_id: user._id,
				order_price: cost

			}).then(function successCallback(response) {
				// this callback will be called asynchronously
				// when the response is available
				$scope.unit = '';
				$scope.notes = '';
				$scope.quantity = '';
				$scope.beer_name = '';
				alert('Beer request created successfully!');
			}, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				alert(response);
			});
		} else {
			alert('Provide required information before submitting.');
		}
		$location.url('/');
	}
	
	/*
	$scope.delete = function(thing) {
		$http.delete('/api/beers/' + thing._id);      
    	$scope.beers.splice(this.$index, 1);
    	console.log($scope.beers);
    	alert('Beer deleted successfully');
	};
	*/
	$scope.view = function(request) {
		console.log(request);
		console.log(request._id);
		$scope.requestnotes = request.notes;
		//requests.edit(request);    
	    //redirect to beer view.
	    $location.url('requests/edit');
	};

	$scope.edit = function(request) {
		console.log('edit controller');
		//Put call, just like for beers, and ID 
	    
	};

    
}

angular.module('cerveceriaApp')
  .controller('RequestController', RequestController);

}) ();