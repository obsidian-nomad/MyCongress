'use strict';

angular.module('myCongressApp')
  .config(function ($stateProvider) {
    $stateProvider
      // changed to main
      .state('main', {
        url: '/',
        templateUrl: 'app/main/browse.html',
        // controller: 'profileController'
        // templateUrl: '/index.html',
      })
      .state('test', {
        url: '/test',
        templateUrl: 'app/test.html',
        controller: 'dataController'
      })
      // See angular parameter documentation here: https://github.com/angular-ui/ui-router/wiki/URL-Routing
      .state('profiles'/*{repId}*/, {
        url: '/profiles',
        templateUrl: 'app/main/repProfile.html',
        controller: 'profileController'
      })
      .state('browse', {
        url: '/browse',
        templateUrl: 'app/tiles/tiles.html'
      });
  })

  // this controller is used solely on the test page to test data we can pull
  .controller('dataController', function($scope, Bills, Politicians) {
    // modify the parameters here to play with what data you can get from the sunlight API
    Bills.getBills().then(function(data){
      $scope.bills = data;
    });

    Bills.getVotes().then(function(data){
      $scope.votes = data;
    });
    //example of parameters passed into the function call
    Politicians.getReps().then(function(data){
      console.log('getReps DATA:', data.data[0]);
      $scope.reps = data.data[0];
    });
  })

  .controller('profileController', function($scope, Profile, Politicians){
    // We can change this function later to reflect different reps
    Politicians.getReps().then(function(data){
      var current = data.data[0];
      $scope.title = current['title'];
      $scope.name = current['first_name'] + ' ' + current['last_name'];
      $scope.website = current['website'];
      $scope.contactForm = current['contact_form'];
      $scope.fbId = current['facebook_id'];
      $scope.twitterId = current['twitter_id'];
      $scope.youtubeId = current['youtube_id'];
    });

    Profile.getTwitterFeed($scope.twitterId).then(function(data){
      console.log('controller twitter feed', data);
    });

    $scope.profPic = 'http://upload.wikimedia.org/wikipedia/en/e/ef/Nancy_Pelosi_2013.jpg'/*Profile.getProfilePictureSrc()*/;
    $scope.party = 'Democrat';


  });

