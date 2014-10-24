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
    fetchLegislators(function(legislators){
      addInfluenceData(legislators, function(legislators){
        importLegislators(legislators);
      });
    })
      
  }
};

//function downloads and parses all legislator data from sunlight /legislators
//passes array of pre legislator objects to callback
function fetchLegislators(cb){

  request.get('http://congress.api.sunlightfoundation.com/legislators?per_page=all&in_office=true&apikey=d5ac2a8391d94345b8e93d5c69dd8739', 
    function(err, res, body){
      if (err){
        console.log("Error retrieving Legislators from sunlight: " + err.message);
        throw err;
      }

      var results = JSON.parse(body).results;
      return cb(results);
    }
  );
}

//function updates each legislator with relevent info from influence explorer
function addInfluenceData(legislators, callback){
  //kickoff addInfluenceData
  addTransparencyDataIds(legislators, addContributionData);

  function addTransparencyDataIds (legislators, cb){
    //Add transparency data id (former influence explorer API ID) to each legislator 
    async.each(legislators, function (legislator, asyncCb){  
      var crpID = legislator.crp_id;

      //Make ID lookup request for each legislator's transparency data ID. save as property on legislator.
      request.get('http://transparencydata.com/api/1.0/entities/id_lookup.json?namespace=urn%3Acrp%3Arecipient&id='+crpID+'&apikey=d5ac2a8391d94345b8e93d5c69dd8739', 
        function(err, res, body){
          if (err){
            console.log("Error retrieving Legislator transparency ID from sunlight: " , err.message, 'legistlator: ', legislator);
            throw err;
          }
          var newID = JSON.parse(body)[0].id;
          //set prop on legislator
          legislator.transparency_data_Id = newID;
          //Done with this legislator
          asyncCb(null); 
        }
      );
    //done with all legislators, call callback for next op
    }, function(){ 
      cb(legislators);
    });
  };

  function addContributionData (legislators){

    //Add top contributing industries to each legislator
    async.each(legislators, function (legislator, outterAsyncCb){
      var transparencyID = legislator.transparency_data_Id;

      //Make request for each legislator using transparency data ID
      request.get('http://transparencydata.com/api/1.0/aggregates/pol/'+transparencyID+'/contributors/industries.json?apikey=d5ac2a8391d94345b8e93d5c69dd8739', 
        function(err, res, body){
          if (err){
            console.log("Error retrieving Legislator contributor industries from sunlight: " , err.message, 'legistlator: ', legislator);
            throw err;
          }
          var topIndustries = JSON.parse(body);

          //Process industries to fit schema
          async.each(topIndustries, function (industry, innerAsyncCb2){
            //delete superfluous properties
            delete industry.id;
            delete industry.should_show_entity;

            //rename desired properties
            industry.total_amount = industry.amount;
            delete industry.amount;
            industry.number_contributions = industry.count;
            delete industry.count;

            //Done with this industry
            innerAsyncCb2(null);
          }, 

          //Done with this legislator's industries
          function(err){
            //set prop on legislator and move on
            legislator.top_Contributing_Industries = topIndustries;
            outterAsyncCb(null); 
          });
        }
      );

    //Done Adding top_Contributing_Industries to legislators
    //Call outermost function callback (addInfluenceData())
    }, function(){
      callback(legislators);
    });
  };
}



// function addBillsSponsorship(array){
//
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