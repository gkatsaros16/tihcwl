'use strict';

tihcwlApp.controller('CreateWishListController',
  function CreateWishListController($scope, $route, firebasePost, firebaseGet, $firebaseArray) {
    $scope.bands = [];

    var userWishListRef = firebaseGet.getWishListById($scope.uid);

    if ($scope.currentUser) {
      userWishListRef.once('value').then(function(snapshot) {
        var bands = snapshot.val()
        if (bands) {
          bands.forEach(function(band){
            $scope.bands.push({name: band})
          })
        } else {
          $scope.bands.push({})
        }

        if (!$scope.bands[0]) {
          $scope.bands = [{}];
        }
        $scope.$apply()
      });
    }

    $scope.saveWishList = function(wishList, newWishListForm){
      if (newWishListForm.$valid) {
        console.log($scope.uid)
        firebasePost.writeWishList(wishList, $scope.uid)
        $scope.updated = true;
      }
    };

    $scope.addBand = function(){
      $scope.bands.push({});
      $scope.updated = false;
    };

    $scope.removeBand = function(bandName){
      //polyfill indexOf later
      var record = $scope.bands.filter(band => (band.name === bandName));

      var index = $scope.bands.indexOf(record[0])
      if (index > -1) {
        $scope.bands.splice(index, 1);
      };
      $scope.updated = false;
    };

    $scope.photoURL ? firebase.auth().currentUser.photoURL : '../img/images.png'
  }
)
