'use strict';

tihcwlApp.controller('WishListsController',
  function WishListsController($scope, firebaseGet, $firebaseArray) {
    let wishListsRef = firebaseGet.getWishLists();
    let allWishLists = $firebaseArray(wishListsRef);
    $scope.wishLists = allWishLists;
  }
)
