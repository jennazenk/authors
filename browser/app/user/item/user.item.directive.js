'use strict';

app.directive('userItem', function () {
  return {
    restrict: 'E',
    templateUrl: '/browser/app/user/item/user.item.html',
    scope: {
      user: '=model', // binds the variable user to whatever model equals 
      loggedInUser : '=test', //passing a variable from the controller to the directive through user list html
      glyphicon: '@',
      iconClick: '&',
      afterRemove: '&'
    },
    link: function (scope, elem, attrs) {
      console.log(scope.loggedInUser);
      console.log(scope.loggedInUser.admin);
      if (attrs.hasOwnProperty('isForm')) scope.isForm = true;
      if (attrs.hasOwnProperty('iconClick')) scope.hasIconClick = true;
      if (!scope.isForm) {
        var hasInitialized = false;
        scope.$watch('user', function () {
          if (!hasInitialized) hasInitialized = true;
          else scope.user.save();
        }, true);
      }
      scope.removeUser = function () {
        scope.user.destroy()
        .then(function () {
          scope.afterRemove();
        });
      };
    }
  }
});
