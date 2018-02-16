'use strict';

tihcwlApp.controller('TIHCWLController',
  function TIHCWLController($scope, firebaseGet, $firebaseArray) {
    $scope.masterList = [];

    let masterListRef = firebaseGet.getMasterList();

    masterListRef.once('value').then(function(snapshot) {
      snapshot.forEach(function(band){
        $scope.masterList.push({
          name: band.key,
          count: band.val()
        });
      });
      $scope.$apply();
    });
  }
)
