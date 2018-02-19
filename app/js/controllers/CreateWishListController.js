'use strict';

tihcwlApp.controller('CreateWishListController',
  function CreateWishListController($scope, $route, firebasePost, firebaseGet, $firebaseArray) {
    $scope.bands = [];

    var userWishListRef = firebaseGet.getWishListById($scope.uid);

    userWishListRef.once('value').then(function(snapshot) {
      var bands = snapshot.val()
      if (bands == null) {
        $route.reload();
      }

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

    $scope.photoURL ? firebase.auth().currentUser.photoURL : '../img/images.png'
  }
)
