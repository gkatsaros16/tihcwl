'use strict'
var tihcwlApp = angular.module('tihcwlApp', ['ngResource', 'ngRoute', 'firebase', 'angular.filter'])
  .config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when('/WishLists',
    {
      templateUrl: 'templates/WishLists.html',
      controller: 'WishlistsController'
    })
    .when('/CreateWishList',
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
      templateUrl: 'templates/Account.html',
      controller: 'AccountController'
    }).otherwise(
    {
      redirectTo: '/TIHCWL'
    });
  });
