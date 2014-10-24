var Legislator = require('/server/api/lawmaker/lawmaker.model.js');
var https = require('http');
var _ = require('lodash');




//function downloads and parses all legislator data from sunlight /legislators
//returns array of pre legislator objects
function fetchLegislators(){
  var results = [];



  return results;
}

//function updates each legislator with relevent info from influence explorer
function addInfluenceData(array){
  var addTransparencyDataIds = function (array){
    
  };

  var addContributionData = function(array){

  };

}

function addBillsSponsorship(array){

}


//takes array of legislator objects and saves them as lawmaker models to db or updates them
function importLegislators(array){
  for (var i = 0; i < array.length; i++) {
    Legislator.update(array[i].bioguide_id, array[i], {upsert: true}, function(err, numberAffected, rawResponse){  
      if (err) {console.log('Error importing legislators:', err, 'on legislator: ', rawResponse);}
      console.log('Legislator imported: ', rawResponse);
    });
  };
}