tihcwlApp.factory('firebaseGet', function(){
  return {
    getWishLists: function() {
      return {
        users: firebase.database().ref().child("Users"),
        wishList: firebase.database().ref().child("WishList")
      }
    },
    getWishListById: function(userId) {
      return firebase.database().ref().child("WishList").child(userId);
    },
    getMasterList: function() {
      return firebase.database().ref("MasterList");
    },
    getBandListbyId: function(bandId) {
      return firebase.database().ref().child("bandList").child(bandId.toString());
    }
  }
})
