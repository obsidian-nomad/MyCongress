var Legislator = require('../api/lawmaker/lawmaker.model.js');
var request = require('request');
var async = require('async');
var _ = require('lodash');


module.exports = {
  //for testing:
  fetch: function(cb){
    return fetchLegislators(cb);
  },
  addInfluence: function(legislators, callback){
    return addInfluenceData(legislators, callback);
  },

  //For Use
  populateDb: function(){
 
  }
};

//function downloads and parses all legislator data from sunlight /legislators
//returns array of pre legislator objects
function fetchLegislators(cb){

  request.get('http://congress.api.sunlightfoundation.com/legislators?per_page=all&in_office=true&apikey=d5ac2a8391d94345b8e93d5c69dd8739', 
    function(err, res, body){
      if (err){
        console.log("Error retrieving Legislators from sunlight: " + err.message);
        throw err;
      }

      var results = JSON.parse(body).results;
      //console.log('request callback called. Response:', results[0]);
      return cb(results);
    }
  );
}

//function updates each legislator with relevent info from influence explorer
function addInfluenceData(legislators, callback){

  var addTransparencyDataIds = function (legislators, cb){
    async.each(legislators, function (legislator, asyncCb){
      var crpID = legislator.crp_id;
      request.get('http://transparencydata.com/api/1.0/entities/id_lookup.json?namespace=urn%3Acrp%3Arecipient&id='+crpID+'&apikey=d5ac2a8391d94345b8e93d5c69dd8739', 
        function(err, res, body){
          if (err){
            console.log("Error retrieving Legislator transparency ID from sunlight: " , err.message);
            throw err;
          }
          var newID = JSON.parse(body)[0].id;
          legislator.transparency_data_Id = newID;
          asyncCb(null); //required to keep async going
        }
      );
    }, function(err){
      if (err){
        console.log("Error retrieving Legislator transparency ID from sunlight: " , err.message);
        throw err;
      }
      cb(legislators);
    });
  };

  var addContributionData = function(legislators){

    //add top contributing industries to each legislator
    async.each(legislators, function (legislator, asyncCb){

      var transparencyID = legislator.transparency_data_Id;

      request.get('http://transparencydata.com/api/1.0/aggregates/pol/'+transparencyID+'/contributors/industries.json?apikey=d5ac2a8391d94345b8e93d5c69dd8739', 
        function(err, res, body){
          if (err){
            console.log("Error retrieving Legislator transparency ID from sunlight: " , err.message);
            throw err;
          }
          var topIndustries = JSON.parse(body);

          //Process industries to fit schema
          async.each(topIndustries, function (industry, asyncCb2){

            delete industry.id;
            delete industry.should_show_entity;

            industry.total_amount = industry.amount;
            delete industry.amount;

            industry.number_contributions = industry.count;
            delete industry.count;
            asyncCb2(null);
          }, 
          //after industries processed
          function(err){
            legislator.top_Contributing_Industries = topIndustries;
            asyncCb(null); //continue async.each
          });
        }
      );
      //after industries added
    }, function(err){
      if (err){
        console.log("Error retrieving Legislator transparency ID from sunlight: " , err.message);
        throw err;
      }
      callback(legislators);
    });
  };

  //kickoff addInfluenceData
  addTransparencyDataIds(legislators, addContributionData);
}


// function addBillsSponsorship(array){

// }


//takes array of legislator objects and saves them as lawmaker models to db or updates them
function importLegislators(array){
  for (var i = 0; i < array.length; i++) {
    Legislator.update(array[i].bioguide_id, array[i], {upsert: true}, function(err, numberAffected, rawResponse){  
      if (err) {console.log('Error importing legislators:', err, 'on legislator: ', rawResponse);}
      console.log('Legislator imported: ', rawResponse);
    });
  };
}