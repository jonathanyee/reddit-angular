'use strict';

var redditApp = angular.module('angularredditApp',
    ['ngRoute', 'redditController']);

redditApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: './views/main.html',
        controller: 'MainCtrl'
      }).
    otherwise({
        redirectTo: '/'
      });
  }]);