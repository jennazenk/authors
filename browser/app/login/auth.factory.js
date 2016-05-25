'use strict';

app.factory('Auth', function($http,$log) {

    var Auth = {}
    Auth.currentUser = {}

    Auth.submitLogin = function(data) {
        return $http.post('/login', data)
            .then(function(response) {
                Auth.currentUser.id = response.data.id;
                Auth.currentUser.admin = response.data.isAdmin;
                return response.data;
            })
            .catch($log.error);
    }

    Auth.logout = function() {
        return $http.delete('/logout')
            .then(function(response) {
                Auth.currentUser = {};
                console.log(response)
                return response.data;
            });
    }


    Auth.signup = function(data) {
        return $http.put('/signup', data)
        .then(function(response) {
            Auth.currentUser.id = response.data.id;
            Auth.currentUser.admin = response.data.isAdmin;
            console.log(response.data);
        })
    }     

    return Auth;

});
