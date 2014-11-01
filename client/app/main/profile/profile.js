angular.module('myCongressApp')

  // this controller is used solely on the test page to test data we can pull

  .controller('profileController', function($scope, Profile, Politicians, Donors, Charts, $stateParams){
    // we can change this function later to reflect different reps
    var id = $stateParams.id;
    $scope.gg = Charts.pieChart();
      Politicians.getRep(id).then(function (data) {
          var current = data.data.results[0];
          var parties = {'D': 'Democrat', 'R': 'Republican', 'I': 'Independent'};
          var name = current.first_name + ' ' + current.last_name;
          $scope.rep = current;
          $scope.website = current['website'];
          $scope.contactForm = current['contact_form'];
          $scope.fbId = current['facebook_id'];
          $scope.twitterId = current['twitter_id'];
          $scope.youtubeId = current['youtube_id'];
          $scope.rep.party = parties[current['party']];
          return name;
      }).then(function (name) {
        Donors.getPolitician(name).then(function(data){

          if (!data.data[0]) { 
            $scope.errormessage = 'No financing available';
            return;
          }
          $scope.totalFinancing = data.data[0].total_received;
          var transparencyId = data.data[0].id;
          // $scope.sunriseIdToTransparencyId[rep.bioguide_id] = transparencyId;
          // $scope.transparencyIdToSunriseId[transparencyId] = rep.bioguide_id;
          Donors.getTopContributorsofPolitician(transparencyId).then(function(data){
            console.log('top contrib', data.data);
            $scope.topDonors = data.data;

          });

          Donors.getTopSectorsofPolitician(transparencyId).then(function(data){
            console.log('top sector ', data.data);
            $scope.topSectors = data.data;

          });

          $scope.industryToggle = false;
          $scope.industriesData = [];
          Donors.getTopIndustriesofPolitician(transparencyId).then(function(data){
            console.log('top industry ', data.data);
            $scope.topIndustries = data.data;
            for (var i = 0; i < $scope.topIndustries.length; i++) {
              $scope.industriesData.push(data.data[i].amount);
            }
          $scope.industryToggle = true;
          $scope.pieChartConfig = {
            options: {
              chart: {
                type: 'bar'
              }
            },
            series: [{
              data: $scope.industriesData
            }],
            title: {
              text: 'Hello'
            },

            loading: true
          }
        });
      });
    })
console.log($scope.topIndustries);
    // var twitterFetch = function(){
    //   Profile.getTwitterFeed($scope.twitterId).then(function(data){

    //     // $scope.twitterBio = $scope.rep.user.description;

    //     // Handles differing file extensions for the images (i.e. JPG, and JPEG)
    //     var imageURL = $scope.rep.user.profile_image_url;
    //     if ( imageURL[imageURL.length - 4] === "." ){
    //       $scope.twitterPhotoURL = $scope.rep.user.profile_image_url.slice(0,-10) + "400x400.jpg";
    //     } else if ( imageURL[imageURL.length - 5] === "." ){
    //       $scope.twitterPhotoURL = $scope.rep.user.profile_image_url.slice(0,-11) + "400x400.jpeg";
    //     }
    //   });
    // }

    $scope.toggleLoading = function () {
        this.chartConfig.loading = !this.chartConfig.loading
    };
  });
