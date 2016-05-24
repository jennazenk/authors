'use strict';

app.controller('AuthCtrl', function ($scope, Auth, $state, $log) {

	$scope.submit = function() {
	var loginInfo = {
		'email': $scope.email,
		'password' : $scope.password
	}
	   Auth.submitLogin(loginInfo)	
		.then(function() {
			$state.go('stories');
		})
		.catch($log.error);			
	}

	$scope.logout = function(){
		Auth.logout()
		.then(function(response){
			console.log('session ended')
		})
		.catch($log.error)
	}

	$scope.signup = function(){
		var loginInfo = {
		email: $scope.email,
		password : $scope.password
		}
		return Auth.signup(loginInfo)	
		.then(function() {
			$state.go('stories');
		})
		.catch($log.error);	
	}

});
