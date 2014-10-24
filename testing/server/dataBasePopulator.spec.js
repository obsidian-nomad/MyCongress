'use strict';
var request = require('supertest');
var should = require('should');

var request = require('request');
var Populator = require('../../server/config/databasePopulator_v1.js');


var fetchedLegislators;
describe('Unit testing helper methods by Inserting dummy callbacks\n', function(){
  describe('Testing fetchLegislators()...\n', function(){

    it('should get an array of legislator json objects from sunlight: ', function(done){
      this.timeout(4000);
      Populator.fetch(function(results){
        fetchedLegislators = results.slice(0,3);
        results.should.be.instanceof(Array);
        results[0].should.be.an.instanceOf(Object).and.have.property('bioguide_id');
        done();
      });
    });
  });

  describe('testing addInfluenceData()...\n', function(){
    it('should leave legislators with new property transparency_id', function(done){
      this.timeout(5000);
      Populator.addInfluence(fetchedLegislators, function(results){
        results[0].should.have.property('transparency_data_Id');      
      });
      done();
    });

    it('should leave legislators with new property top_Contributing_Industries', function(done){
      this.timeout(5000);
      Populator.addInfluence(fetchedLegislators, function(results){
        results[0].should.have.property('top_Contributing_Industries');
      });
      done();
    });
  }); 
});

describe('testing populateDb()...\n ', function(){

  // beforeEach(function(done){
  //TODO consider dripping test db's here. but HOW? where is the connection, etc?
  //below doesn't work
    //mongoose.connection.collections['collectionName'].drop( function(err) {});
    //done();
  // });

  it('should send legislator data to db by interacting with lawmaker model', function(done){
    this.timeout(10000);
    Populator.populateDb();
    console.log('Check DB manually');
    done();
  });
});
