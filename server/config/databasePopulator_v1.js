var Legislator = require('../api/legislator/legislator.model.js');
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

  testImport: function(legislatorsArray, cb){
    importLegislators(legislatorsArray, cb);
  },

  //For Use

  //***Public method to kickoff db legislator population
  //Run manually via node repl or via cron
  //This public method takes a callback and fetches currently serving legislator data from the APIs
  //it passes no arguments to it's callback
  //**
  //Note, it does not delete any former legislators, 
  //so the database must be cleaned after elections
  //or the app rearchitectured to handle former legislator data on the fornt end
  //************

  populateDb: function(cb){
    fetchLegislators(function(legislators){
      addInfluenceData(legislators, function(legislators){
        importLegislators(legislators, cb);
      });
    });  
  }
};

//takes array of legislator objects and saves them as legislator models to db or updates them
function importLegislators (legislators, cb){
    console.log('Saving legislators to db');

    //prepare bulk upsert operation
    var bulkOperation = Legislator.collection.initializeUnorderedBulkOp();
    var dbOpsCounter = 0;

  //add each legislator upsert to bulk op
  for (var i = 0; i < legislators.length; i++) {
    bulkOperation.find({bioguide_id: legislators[i].bioguide_id}).Upsert().updateOne(legislators[i]);

    dbOpsCounter++;    //must execute bulk every 1000 ops

    //IF any upserts past limit**SHOULD BE NONE (~530 legislators)
    //at limit? Send bulk operation, and begin new one
    if ( dbOpsCounter % 1000 === 0 ){
      bulkOperation.execute(function(err, result) {
        if (err) {
        console.log('Error importing legislators.  Error during db bulk Upsert Operation');
        }
        //Initialize new bulk op
        bulkOperation = Legislator.collection.initializeUnorderedBulkOp();
        dbOpsCounter=0;
        });//END bulk operation callback

     }//END if
  }; //END for

  //Send bulk operation to db
  if ( dbOpsCounter !== 0 ){
    bulkOperation.execute(function(err, result) {
     if (err) {console.log('Error importing legislators.  Error during db bulk Upsert Operation');}
     console.log('Successful bulk upsert');
    });
  }
  if(cb) { cb(); } //for testing files
}


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
    }, function(err){
      if (err) throw err;
      callback(legislators);
    });
  };
}

//API Tester: http://tryit.sunlightfoundation.com/congress

//future methods. modularize.

// function addBillsSponsorship(legislators, cb){
//
// }

// function addCommitteeMembership(legislators, cb){
//
// }

// function addLocal_vs_outOfState_contributions(legislators, cb){
//
// }

// function addContributor_type_comparison(legislators, cb){
//
// }


