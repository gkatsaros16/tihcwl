tihcwlApp.factory('firebaseGet', function(){
  return {
    getWishLists: function() {
      return {
        users: firebase.database().ref("Users"),
        wishLists: firebase.database().ref("WishList")
      }
    },
    getUserById: function(uid) {
      return firebase.database().ref("Users/" + uid)
    },
    getWishListById: function(uid) {
      return firebase.database().ref("WishList/" + uid);
    },
    getMasterList: function() {
      return firebase.database().ref("MasterList");
    },
    getBandListbyId: function(bandId) {
      return firebase.database().ref().child("bandList").child(bandId.toString());
    }
  }
})
