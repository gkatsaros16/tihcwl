tihcwlApp.factory('firebaseAuth', function($window, $route){
  var provider = new firebase.auth.GoogleAuthProvider();

  return {
    googleSignIn: function() {
      firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      $route.reload();
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    },

    signOut: function() {
      firebase.auth().signOut().then(function() {
        $window.location.href = '#/tihcwl';
        $route.reload();
        console.log('Signed Out');
      }, function(error) {
        console.error('Sign Out Error', error);
      });
    }
  }
})
