'use strict';

tihcwlApp.controller('CreateWishListController',
  function CreateWishListController($scope, firebasePost, firebaseGet, $firebaseArray) {
    $scope.bands = [];

    var userWishListRef = firebaseGet.getWishListById($scope.uid);
    
    userWishListRef.once('value').then(function(snapshot) {
      snapshot.forEach(function(band){
        $scope.bands.push({
          name: band.val(),
        });
      });
      if (!$scope.bands[0]) {
        $scope.bands = [{}];
      }
      $scope.$apply()
    });

    $scope.saveWishList = function(wishList, newWishListForm){
      if (newWishListForm.$valid) {
        console.log($scope.uid)
        firebasePost.writeWishList(wishList, $scope.uid)
      }
    };

    $scope.addBand = function(){
      $scope.bands.push({});
    };

    $scope.removeBand = function(bandName){
      //polyfill indexOf later
      var record = $scope.bands.filter(band => (band.name === bandName));

      var index = $scope.bands.indexOf(record[0])
      if (index > -1) {
        $scope.bands.splice(index, 1);
      };
    };
  }
)
