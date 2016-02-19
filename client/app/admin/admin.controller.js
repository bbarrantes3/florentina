'use strict';

angular.module('cerveceriaApp')
  .controller('AdminCtrl', function($scope, $http, Auth, User, adminservice, $location) {
  	var user_data = adminservice.list;

  	if(user_data.length > 0) {
      $scope.userid = user_data[0].id;
      $scope.username = user_data[0].name;
      $scope.userclientname = user_data[0].client_name;
      $scope.useraddress = user_data[0].address;
      $scope.useremail = user_data[0].email;
    }

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.edit = function(user) {
    	adminservice.edit(user);
    	$location.url('admin/edit');
    }

    $scope.update = function() {
		alert("User update disabled temporarily");
		/*

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
	    */
	};

    $scope.delete = function(user) {
    	User.remove({ id: user._id });
      	$scope.users.splice(this.$index, 1);
    };
  });
