'use strict'

angular.module('myCongressApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profiles', {
        url: '/profiles/:id',
        templateUrl: 'app/main/profile/profile.html',
        controller: 'profileController',
        resolve: {
          getProfile: function ($stateParams, Sunlight) {
            return Sunlight.getProfile({id: $stateParams.id}).$promise;
          },
          transparencyId: function (Sunlight, getProfile) {
            var name = getProfile.results[0].first_name + '+' + getProfile.results[0].last_name;
            return Sunlight.getDonorId({id: name}).$promise;
          },
          topDonors: function ($stateParams, Sunlight, transparencyId) {
            return Sunlight.getTopDonors({id: transparencyId.id}).$promise;
          },
          topSectors: function ($stateParams, Sunlight, transparencyId) {
            return Sunlight.getTopSectors({id: transparencyId.id}).$promise;
          },
          topIndustries: function ($stateParams, Sunlight, transparencyId) {
            return Sunlight.getTopIndustries({id: transparencyId.id}).$promise;
          },
        }
      });
    })

  .controller('profileController', function($scope, $stateParams, Donors, Charts, sectorCodes, getProfile, topDonors, topSectors, topIndustries){
    var parties = {'D': 'Democrat', 'R': 'Republican', 'I': 'Independent'};
    var profile = getProfile.results[0];
      $scope.rep = profile;
      $scope.website = profile['website'];
      $scope.contactForm = profile['contact_form'];
      $scope.fbId = profile['facebook_id'];
      $scope.twitterId = profile['twitter_id'];
      $scope.youtubeId = profile['youtube_id'];
      $scope.rep.party = parties[profile['party']];

      $scope.topData = [];
      angular.forEach(topDonors.donors, function (donor, i) {
          var name = donor.name;
          var amount = parseInt(donor.total_amount);
          $scope.topData.push([name, amount]);
      });
      console.log('yo',$scope.topData);
      $scope.TopChartConfig = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          backgroundColor:'rgba(0, 0, 0, 0)'
        },
        title: {
          text: 'Top Donors',
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
          data: $scope.topData.slice(0,5),
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
      $scope.sectorData = [];
      angular.forEach(topSectors.sectors, function (sector, i) {
          var name = sectorCodes[sector.sector];
          var amount = parseInt(sector.amount);
          $scope.sectorData.push([name, amount]);
      });
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
          data: $scope.sectorData.slice(0,5),
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
      $scope.industriesData = [];
      angular.forEach(topIndustries.industries, function (industry, i) {
          var name = industry.name[0] + industry.name.toLowerCase().substr(1, industry.name.length - 1);
          var amount = parseInt(industry.amount);
          $scope.industriesData.push([name, amount]);
      });
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
        data: $scope.industriesData.slice(0,5),
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
