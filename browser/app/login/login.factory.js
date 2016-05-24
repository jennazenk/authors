'use strict';

app.factory('Auth', function($http,$log) {

    var Auth = {}

    Auth.submitLogin = function(data) {
        console.log('submittingLogin', data);
        return $http.post('/login', data)
            .then(function(response) {
                return response.data;
            })
            .catch($log.error);
    }

    Auth.logout = function() {
        return $http.delete('/logout')
            .then(function(response) {
                console.log(response)
                return response.data;
            });
    }


    Auth.signup = function(data) {
        return $http.put('/signup', data)
        .then(function(response) {
            console.log(response.data);
        })
    }     





    return Auth;

});
