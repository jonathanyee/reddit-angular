'use strict';

var redditController = angular.module('redditController', ['ngSanitize']);

redditController.controller('MainCtrl',
  ['$scope', '$http', '$sce',
  function ($scope, $http, $sce) {
    $http.get('http://www.reddit.com/.json').success(function(data) {
        $scope.posts = [];
        var redditData = data.data.children;
        for (var i = 0; i < redditData.length; i++) {
          $scope.posts.push(redditData[i].data);
        }
      });

    $scope.details = function(index) {
      var post = $scope.posts[index];
      console.log(post);
      $scope.post = post;
      $scope.image = (isImage(post.url)) ? post.url : false;
      // $scope.thumbnail = (post.thumbnail !== '') ? post.thumbnail : false;
      $scope.embed = (post.media) ?
        $sce.trustAsHtml(unescapedHtml(post.media.oembed.html)) : null;
    };

    function isImage(url) {
      return ((url.indexOf('.jpg') !== -1) ||
        (url.indexOf('.jpeg') !== -1) ||
        (url.indexOf('.gif') !== -1) ||
        (url.indexOf('.png') !== -1));
    }
    function unescapedHtml(escapedHtml) {
      return escapedHtml.
        replace(/&lt;/g, '<').
        replace(/&gt;/g, '>');
    }
  }]);