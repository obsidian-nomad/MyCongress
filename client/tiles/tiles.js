angular.module('myCongress.tiles', [])

.controller('TileController', function($scope) {
  $scope.bios = [{position: 'Senator',
  								name: 'Dianne Feinstein', 
  								party: 'Democrat',
  								state: 'California',
  								district: '',
  								website: 'http://www.feinstein.senate.gov/public/',
  								image: 'http://upload.wikimedia.org/wikipedia/commons/7/7d/Dianne_Feinstein,_official_Senate_photo_2.jpg'},

  								{position: 'Congresswoman',
  								name: 'Nancy Polosi', 
  								party: 'Democrat',
  								state: 'California',
  								district: '12th District',
  								website: 'http://pelosi.house.gov/',
  								image: 'http://upload.wikimedia.org/wikipedia/en/thumb/e/ef/Nancy_Pelosi_2013.jpg/440px-Nancy_Pelosi_2013.jpg'},

  								{position: 'Congressman',
  								name: 'Eric Swalwell', 
  								party: 'Democrat',
  								state: 'California',
  								district: '15th District',
  								website: 'http://swalwell.house.gov/',
  								image: 'http://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Eric_Swalwell%2C_official_portrait%2C_113th_Congress.jpg/440px-Eric_Swalwell%2C_official_portrait%2C_113th_Congress.jpg'}]
});