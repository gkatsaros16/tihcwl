'use strict';

tihcwlApp.controller('AuthController',
  function AuthController($scope, firebaseAuth, firebaseGet) {
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
        $scope.currentUser = firebase.auth().currentUser;

        firebaseGet.getUserById(user.uid).once('value').then(function(snapshot){
          if (!snapshot.val()) {
            var newUser = {}
            newUser[user.uid] = user.displayName
            firebase.database().ref("Users/").update(newUser)
          }
        })
        // ...
      } else {
        $scope.displayName = "";
        $scope.email = "";
        $scope.emailVerified = "";
        $scope.photoURL = "";
        $scope.isAnonymous = "";
        $scope.uid = "";
        $scope.providerData = "";
        $scope.currentUser = null;
      }
    });

    $scope.signInGmail = function() {
      firebaseAuth.googleSignIn();
    }

    $scope.signOut = function() {
      firebaseAuth.signOut();
    }

    $scope.currentUser = firebase.auth().currentUser
});
