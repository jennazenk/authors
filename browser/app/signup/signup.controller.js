'use strict';

app.controller('SignupCtrl', function ($scope, $state, $log, Signup) {

	$scope.signup = function(){
		var loginInfo = {
		email: $scope.email,
		password : $scope.password
		}
		return Signup.signup(loginInfo)	
		.then(function() {
			$state.go('stories');
		})
		.catch($log.error);	
	}

});
