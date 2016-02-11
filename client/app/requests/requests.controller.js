
'use strict';
(function() {

function RequestController($scope, $http, $location, Auth, reqservice) {
	var self = this;
	
	//Get beers to be loaded in a combo box
	$http.get('/api/beers').then(function(response) {
	    $scope.beers = response.data;
	});

	$http.get('/api/requests').then(function(response) {
	    $scope.requests = response.data;
	});

	$scope.$on('$routeChangeStart', function(next, current) {
	   if ($location.url() != '/requests/edit') {
	       reqservice.clean();
	   }
	});

	var request_data = reqservice.list;
	if(request_data.length > 0) {
      $scope.reqid = request_data[0].id;
      $scope.beername = request_data[0].beer_name;
      $scope.clientid = request_data[0].client_id;
      $scope.clientname = request_data[0].client_name;
      $scope.kegsize = request_data[0].keg_size.toString();
      $scope.notes = request_data[0].notes;
      $scope.orderprice = request_data[0].order_price;
      $scope.status = request_data[0].status;
      $scope.timestamp = request_data[0].timestamp;
      $scope.totalkegs = request_data[0].total_kegs; 
    }

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
		//$location.url('/requests');
		window.location.href = "http://localhost:9000/requests";//This needs to be changed.
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
		reqservice.edit(request);
	    $location.url('requests/edit');
	};

	$scope.edit = function() {
		var user = Auth.getCurrentUser();
		//Calculate price for order, read cost of keg according to size from config file
		var cost = this.totalkegs * kegs['k'+this.kegsize];

		if($scope.totalkegs && $scope.kegsize && $scope.beername) {
			var notes = (this.notes === undefined)? "" : this.notes;
			$http.put('/api/requests/'+this.reqid,
			{
				total_kegs: this.totalkegs,
				keg_size: this.kegsize,
				beer_name: this.beername,
				notes: notes,
				status: 'received & updated',
				//timestamp: Date.now,
				client_name: user.client_name,
				client_id: user._id,
				order_price: cost

			}).then(function successCallback(response) {
				// this callback will be called asynchronously
				// when the response is available
				$scope.totalkegs = '';
				$scope.notes = '';
				$scope.kegsize = '';
				$scope.beername = '';
				alert('Beer request updated successfully!');
			}, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				alert(response);
			});
		} else {
			alert('Provide required information before submitting request edition.');
		}
		$location.url('/');
	    
	};

	$scope.delete = function(request) {
		$http.delete('/api/requests/' + request._id);      
    	$scope.requests.splice(this.$index, 1);
    	alert('Request deleted successfully');
	};
    
}

angular.module('cerveceriaApp')
  .controller('RequestController', RequestController);
}) ();

