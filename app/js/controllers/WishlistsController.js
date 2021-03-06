'use strict';

tihcwlApp.controller('WishlistsController',
  function WishlistsController($scope, firebaseGet, $firebaseArray) {
    $scope.wishLists = [];
    let wishListsRefs = firebaseGet.getWishLists();

    wishListsRefs.users.once('value').then(function(snapshot1) {
      snapshot1.forEach(function(users){
        wishListsRefs.wishLists.once('value').then(function(snapshot2){
          snapshot2.forEach(function(wishlist){
            if (users.key == wishlist.key) {
              var userObj = users.val()

              $scope.wishLists.push({
                name: userObj.name,
                photoURL: userObj.photoURL,
                isPrivate: userObj.isPrivate,
                bands: wishlist.val()
              })
            }
          })
          $scope.$apply();
        })
      })
    })
  }
)
