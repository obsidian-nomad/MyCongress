'use strict';

angular.module('myCongressApp')
  .config(function ($stateProvider) {
    $stateProvider
      // changed to main
      .state('test', {
        url: '/test',
        templateUrl: 'app/test.html',
        controller: 'dataController'
      })
      // See angular parameter documentation here: https://github.com/angular-ui/ui-router/wiki/URL-Routing
      .state('profiles', {
        url: '/profiles/:id',
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

  .controller('profileController', function($scope, Profile, Politicians, $stateParams){
    // we can change this function later to reflect different reps
    console.log('STATE PARAMS',$stateParams);
    var id = $stateParams.id;
    Politicians.getRep(id).then(function(data){
      console.log('POLITICIAN ONE data:',data);
      console.log('state: ', data.data.state)
      var current = data.data.results[0];
      $scope.rep = current;
      $scope.website = current['website'];
      $scope.contactForm = current['contact_form'];
      $scope.fbId = current['facebook_id'];
      $scope.twitterId = current['twitter_id'];
      $scope.youtubeId = current['youtube_id'];
      var parties = {'D': 'Democrat', 'R': 'Republican', 'I': 'Independent'};
      $scope.rep.party = parties[current['party']];
      // Once we have fetched the twitter Handle, we can fetch the politician's twitter info
      twitterFetch();
    });

    // Fetches from twitter: 1) short bio and 2) photo URL
    var twitterFetch = function(){
      Profile.getTwitterFeed($scope.twitterId).then(function(data){

        $scope.twitterBio = $scope.rep.user.description;

        // Handles differing file extensions for the images (i.e. JPG, and JPEG)
        var imageURL = $scope.rep.user.profile_image_url;
        if ( imageURL[imageURL.length - 4] === "." ){
          $scope.twitterPhotoURL = $scope.rep.user.profile_image_url.slice(0,-10) + "400x400.jpg";
        } else if ( imageURL[imageURL.length - 5] === "." ){
          $scope.twitterPhotoURL = $scope.rep.user.profile_image_url.slice(0,-11) + "400x400.jpeg";
        }
      });
    }

  });

