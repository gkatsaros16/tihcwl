tihcwlApp.factory('firebasePost', function($firebaseArray, firebaseGet, firebaseAuth){
  var database = firebase.database();

  return {
    writeWishList: function(bandArray, uid) {
      var updateObject = {};
      bandArray.forEach(function(band){
        updateObject[band.name] = true;
      })

      this.updateWishlists(bandArray, uid);
    },

    updateWishlists: function(updatedWishlist, userId) { // [a,b]
      //get previously saved wl for comparison
      var prevWishlistRef = firebaseGet.getWishListById(userId)
      var newWishList = []
      var prevWishlist = []
      var wishlistDiff = []

      updatedWishlist.forEach(function(band){
        newWishList.push(band.name);
      })

      prevWishlistRef.once('value').then(function(snapshot){
        snapshot.forEach(function(prevband){ // [a,b,c]
          prevWishlist.push(prevband.val())
        })

        newWishList.forEach(function(newband){
          if (!prevWishlist.includes(newband)){
            // var bandKey = newband//add/increment ML for new band
            wishlistDiff.push({
              name: newband,
              increment: true
            })
          }
        })

        prevWishlist.forEach(function(prevband){
          if (!newWishList.includes(prevband)){
            wishlistDiff.push({
              name: prevband,
              increment: false
            })
          }
        })

        database.ref('WishList/' + userId).set(newWishList)

        var postRef = firebaseGet.getMasterList();
        postRef.transaction(function(masterList) {
            var masterListBands = []

            if (masterList) {
              for (var obj in masterList) {
                masterListBands.push(masterList[obj].name)
              }

              wishlistDiff.forEach(function(wlBand){
                if (masterListBands.includes(wlBand.name)){
                  for (var mlBand in masterList) {
                    if (wlBand.name == masterList[mlBand].name) {
                      if (wlBand.increment) {
                        masterList[mlBand].count++
                      }

                      if (!wlBand.increment) {
                        masterList[mlBand].count--
                      }
                    }
                  }
                } else {
                  masterList[wlBand.name] = {
                    name: wlBand.name,
                    count: 1
                  }
                }
              })
          }
          return masterList;
        })
      })
    }
  }
})
