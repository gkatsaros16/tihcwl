'use strict';

tihcwlApp.controller('WishListsController',
  function WishListsController($scope, firebaseGet, $firebaseArray) {
    $scope.wishLists = [];
    let wishListsRefs = firebaseGet.getWishLists();

    wishListsRefs.users.once('value').then(function(snapshot1) {
      snapshot1.forEach(function(users){
        console.log(users.val())
        wishListsRefs.wishLists.once('value').then(function(snapshot2){
          snapshot2.forEach(function(wishlist){
            if (users.key == wishlist.key) {
              $scope.wishLists.push({
                name: users.val(),
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
