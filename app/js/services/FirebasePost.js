tihcwlApp.factory('firebasePost', function($firebaseArray, firebaseGet){
  var database = firebase.database();

  return {
    writeWishList: function(bandArray) {
      let userId = 123456;
      database.ref('wishLists/' + userId).update(
          bandArray.map(band => ({
          name: band.name
        }))
      )
    },
    writeBandList: function(bandArray) {
      let bandListRef = firebaseGet.getBandList();
      let bandList = $firebaseArray(bandListRef);
      let firebaseBandListNames = []
      let bandArrayListNames = []

      bandArray.forEach(function(band) {
        bandArrayListNames.push(band.name)
      })

      bandList.$loaded().then(function(){
        bandList.forEach(function(bandFromFirebase) {
          firebaseBandListNames.push(bandFromFirebase.name)

          if (bandArrayListNames.includes(bandFromFirebase.name)){
            bandFromFirebase.count++
            firebaseGet.getBandListbyId(bandFromFirebase.$id).transaction(function(bandFromFirebase){
              bandFromFirebase.count++
              return bandFromFirebase
            })
          }
        })
        // remove should ng-repeat based on firebase ID not $index
        bandArray.forEach(function(bandFromArray) {
          if (!firebaseBandListNames.includes(bandFromArray.name)){
            database.ref('bandList').push({
              name: bandFromArray.name,
              count: 1
            })
          }
        })
      })
    }
  }
})
