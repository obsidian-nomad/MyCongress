var Legislator = require('../api/lawmaker/lawmaker.model.js');
var request = require('request');
var _ = require('lodash');


module.exports = {fetch: function(cb){return fetchLegislators(cb);}};

//function downloads and parses all legislator data from sunlight /legislators
//returns array of pre legislator objects
function fetchLegislators(cb){
  var results = [];

  request.get('http://congress.api.sunlightfoundation.com/legislators?per_page=all&in_office=true&apikey=d5ac2a8391d94345b8e93d5c69dd8739', 
    function(err, res, body){
      if (err){
        console.log("Error retrieving Legislators from sunlight: " + err.message);
        throw err;
      }


      results = JSON.parse(body).results;
      // console.log('request callback called. Response:', results[0]);
      return cb(results);
    });
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