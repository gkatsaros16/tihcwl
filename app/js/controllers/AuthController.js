'use strict';

tihcwlApp.controller('AuthController',
  function AuthController($scope, firebaseAuth) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        $scope.displayName = user.displayName;
        $scope.email = user.email;
        $scope.emailVerified = user.emailVerified;
        $scope.photoURL = user.photoURL;
        $scope.isAnonymous = user.isAnonymous;
        $scope.uid = user.uid;
        $scope.providerData = user.providerData;
        // ...
      } else {
        // User is signed out.
        // ...
      }
    });

    $scope.signInGmail = function() {
      firebaseAuth.googleSignIn();
    }



});
