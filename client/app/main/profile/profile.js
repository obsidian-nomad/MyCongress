angular.module('myCongressApp')

  .controller('profileController', function($scope, Profile, Politicians, Donors, Charts, $stateParams, sectorCodes){
    var id = $stateParams.id;
    $scope.sectorCodes = sectorCodes;
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
        $scope.corpToggle = false;
        $scope.corpData = [];
        Donors.getTopContributorsofPolitician(transparencyId).then(function(data){
          $scope.topDonors = data.data;
          for (var i = 0; i < $scope.topDonors.length - 5; i++) {
            var name = data.data[i].name;
            var amount = parseInt(data.data[i].total_amount);
            $scope.corpData.push([name, amount]);
          }
          $scope.corpToggle = true;
          $scope.CorpChartConfig = {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              backgroundColor:'rgba(0, 0, 0, 0)'
            },
            title: {
              text: 'Top Corporate Donors',
              style: {
                color: '#f5f5f5'
              }
            },
            subtitle: {
              text: 'From company employees',
              style: {
                color: '#a5a5a5'
              }
            },

            series: [{
              type: 'pie',
              name: 'Total Contribution',
              data: $scope.corpData,
            }],
            tooltip: {
              valuePrefix: '$',
              valueSuffix: '',
              style: {
                color: '#e5e5e5'
              }
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b> ',
                  style: {
                    color: 'blue'
                  }
                }
              }
            }
          }
        });

$scope.sectorToggle = false;
$scope.sectorData = [];
Donors.getTopSectorsofPolitician(transparencyId).then(function(data){
  $scope.topSectors = data.data;
  for (var i = 0; i < $scope.topSectors.length - 5; i++) {
    var sector = $scope.sectorCodes[data.data[i].sector];
    var amount = parseInt(data.data[i].amount);
    $scope.sectorData.push([sector, amount]);
  }
  $scope.sectorToggle = true;
  $scope.SectorChartConfig = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      backgroundColor:'rgba(0, 0, 0, 0)',
    },
    title: {
      text: 'Top Donors by Sector',
      style: {
        color: '#f5f5f5'
      }
    },
    series: [{
      type: 'pie',
      name: 'Total Contribution',
      data: $scope.sectorData
    }],
    tooltip: {
      valuePrefix: '$',
      valueSuffix: ''
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    }
  }
});

$scope.industryToggle = false;
$scope.industriesData = [];
Donors.getTopIndustriesofPolitician(transparencyId).then(function(data){
  $scope.topIndustries = data.data;
  for (var i = 0; i < $scope.topIndustries.length - 5; i++) {
    var industry = data.data[i].name[0] + data.data[i].name.toLowerCase().substr(1, data.data[i].name.length - 1);
    var amount = parseInt(data.data[i].amount);
    $scope.industriesData.push([industry, amount]);
  }
  $scope.industryToggle = true;
  $scope.IndustryChartConfig = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      backgroundColor:'rgba(0, 0, 0, 0)',
      style: {
        color: '#3E576F'
      }
    },
    title: {
      text: 'Top Donors by Industry',
      style: {
        color: '#f5f5f5'
      }
    },
    series: [{
      type: 'pie',
      name: 'Total Contribution',
      data: $scope.industriesData
    }],
    tooltip: {
      valuePrefix: '$',
      valueSuffix: ''
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    }
  }
});
})
    $scope.toggleLoading = function () {
      this.chartConfig.loading = !this.chartConfig.loading
    };
  });
});
