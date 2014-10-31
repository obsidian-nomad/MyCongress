angular.module('myCongressApp')

  // this controller is used solely on the test page to test data we can pull

  .controller('profileController', function($scope, Profile, Politicians, Donors, $stateParams){
    // we can change this function later to reflect different reps
    var id = $stateParams.id;
    Politicians.getRep(id).then(function(data){
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
      // twitterFetch();
      Donors.getTopIndustriesofPolitician(id);
      Donors.getTopSectorsofPolitician(id);
    });
    // .then(function (res) {
    //   console.log(res);
    //   $scope.gg = res;
    // });

    // Fetches from twitter: 1) short bio and 2) photo URL
    var twitterFetch = function(){
      Profile.getTwitterFeed($scope.twitterId).then(function(data){

        // $scope.twitterBio = $scope.rep.user.description;

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
