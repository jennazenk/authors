'use strict';

app.controller('LoginCtrl', function ($scope, Login, $state, $log) {

	$scope.submit = function() {
	var loginInfo = {
		email: $scope.email,
		password : $scope.password
	}
		return Login.submitLogin(loginInfo)	
		.then(function() {
			$state.go('stories');
		})
		.catch($log.error);			
	}

});
