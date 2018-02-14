'use strict';

tihcwlApp.controller('CreateWishListController',
  function CreateWishListController($scope, firebasePost, firebaseGet, $firebaseArray) {
    $scope.bands = [{}];

    $scope.saveWishList = function(wishList, newWishListForm){
      if (newWishListForm.$valid) {
        firebasePost.writeWishList(wishList)
      }
    };

    $scope.addBand = function(){
      $scope.bands.push({})
    };
  }
)
