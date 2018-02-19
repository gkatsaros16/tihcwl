'use strict'
var tihcwlApp = angular.module('tihcwlApp', ['ngResource', 'ngRoute', 'firebase', 'angular.filter'])
  .config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when('/wishLists',
    {
      templateUrl: 'templates/WishLists.html',
      controller: 'WishListsController'
    })
    .when('/createWishList',
    {
      templateUrl: 'templates/CreateWishList.html',
      controller: 'CreateWishListController'
    })
    .when('/TIHCWL',
    {
      templateUrl: 'templates/TIHCWL.html',
      controller: 'TIHCWLController'
    }).when('/account',
    {
      templateUrl: 'templates/account.html',
      controller: 'AccountController'
    }).otherwise(
    {
      redirectTo: '/TIHCWL'
    });
  });
