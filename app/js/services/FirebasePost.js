tihcwlApp.factory('firebasePost', function($firebaseArray, firebaseGet){
  var database = firebase.database();
  var userId = 'Geokatz';

  return {
    writeWishList: function(bandArray) {
      var updateObject = {};
      bandArray.forEach(function(band){
        updateObject[band.name] = true;
      })

      database.ref('WishList/' + userId).set(updateObject)
    },

    writeMastList: function(bandArray) {
      //pass in writeWishListDiff
        
    }
  }
})
