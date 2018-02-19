'use strict';

tihcwlApp.controller('AccountController',
  function AuthController($scope, $window, firebaseAuth, firebaseGet) {
    var user = firebase.auth().currentUser;

    $scope.updateUserDetails = function (updateParams) {
      var updateObj = {}
      updateObj[$scope.uid] = {
        name: updateParams.name,
        photoURL: updateParams.photoURL
      }

      firebase.database().ref("Users/").update(updateObj)

      user.updateProfile({
        displayName: updateParams.name,
        photoURL: updateParams.photoURL
      }).then(function() {
        $scope.$apply();
        $window.location.reload();
      }).catch(function(error) {
        // An error happened.
      });
    }
});
