'use strict';

app.factory('Login', function ($http) {
 
  var Login = {}

  Login.submitLogin = function(data) {
    return $http.post('/login', data)
    .then(function(response) {
      return response.data;
    })
  }

  return Login;

});
