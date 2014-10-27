angular.module('myCongress.tiles', ['myCongress.services'])

.controller('TileController', function($scope, Politicians, Profile) {
   Politicians.getReps().then(function(data){
    $scope.bios = data.data;
    for( var key in $scope.bios ){
      twitterFetch($scope.bios[key]);
    }
   });

  // Fetches from twitter: 1) short bio and 2) photo URL
  var twitterFetch = function(rep){
    Profile.getTwitterFeed(rep.twitter_id).then(function(data){
      console.log("DATA", data);
      rep.twitterBio = data.data[0].user.description;

      // Handles differing file extensions for the images (i.e. JPG, and JPEG)
      var imageURL = data.data[0].user.profile_image_url;
      if ( imageURL[imageURL.length - 4] === "." ){
        rep.twitterPhotoURL = data.data[0].user.profile_image_url.slice(0,-10) + "400x400.jpg";
        console.log("PHOTO URL", rep.twitterPhotoURL);
      } else if ( imageURL[imageURL.length - 5] === "." ){
        rep.twitterPhotoURL = data.data[0].user.profile_image_url.slice(0,-11) + "400x400.jpeg";
        console.log("PHOTO URL", rep.twitterPhotoURL);
      }
      console.log("REP IS", rep);
    });
  } 
});