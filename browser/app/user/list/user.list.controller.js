'use strict';

app.controller('UserListCtrl', function ($scope, users, User, Auth) {
  $scope.users = users;
  $scope.currentUser = Auth.currentUser;
  console.log('CURRENTUSER FROM CONTROLLER', $scope.currentUser);

  $scope.addUser = function () {
    $scope.userAdd.save()
    .then(function (user) {
      $scope.userAdd = new User();
      $scope.users.unshift(user);
    });
  };
  
  $scope.userSearch = new User();

  $scope.userAdd = new User();

  // $scope.isAdmin = function() {
  //   console.log('HERE', $scope.currentUser.admin)
  //   return $scope.currentUser.admin;
  // }

});
