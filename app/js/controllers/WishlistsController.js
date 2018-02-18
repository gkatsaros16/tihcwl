'use strict';

tihcwlApp.controller('WishListsController',
  function WishListsController($scope, firebaseGet, $firebaseArray) {
    $scope.wishLists = [];
    let wishListsRefs = firebaseGet.getWishLists();

    wishListsRefs.users.once('value').then(function(snapshot1) {
      snapshot1.forEach(function(user){
        wishListsRefs.wishList.child(user.val()).once('value').then(function(snapshot2){
          var wishList = [];
          snapshot2.forEach(function(band){
            wishList.push(band.val());
          })

          $scope.wishLists.push({
            user: user.val(),
            bands: wishList
          })
        }).then(function(){$scope.$apply()});
      })
    })
  }
)
