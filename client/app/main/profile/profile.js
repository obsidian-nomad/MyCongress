angular.module('myCongressApp')

  // this controller is used solely on the test page to test data we can pull
  .directive('hcPie', function () {
  return {
    restrict: 'C',
    replace: true,
    scope: {
      items: '='
    },
    controller: function ($scope, $element, $attrs) {
      console.log(2);

    },
    template: '<div id="container" style="margin: 0 auto">not working</div>',
    link: function (scope, element, attrs) {
      console.log(3);
      var chart = new Highcharts.Chart({
        chart: {
          renderTo: 'container',
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
        },
        title: {
          text: 'Browser market shares at a specific website, 2010'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage}%</b>',
          percentageDecimals: 1
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              color: '#000000',
              connectorColor: '#000000',
              formatter: function () {
                return '<b>' + this.point.name + '</b>: ' + this.percentage + ' %';
              }
            }
          }
        },
        series: [{
          type: 'pie',
          name: 'Browser share',
          data: scope.items
        }]
      });
      scope.$watch("items", function (newValue) {
        chart.series[0].setData(newValue, true);
      }, true);
      
    }
  }
})
  .controller('profileController', function($scope, Profile, Politicians, Donors, Charts, $stateParams){
    // we can change this function later to reflect different reps
    var id = $stateParams.id;
    $scope.repVotes = {};
    $scope.sunriseIdToTransparencyId = {};
    $scope.transparencyIdToSunriseId = {};
    $scope.topDonorsByRep = {};
    $scope.topIndustriesByRep = {};
    $scope.topSectorsByRep = {};
    $scope.zip = $stateParams.zip;

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
            

          }.bind(this));

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
          

          // $scope.industries = [['A', 1], 'B',2];
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
