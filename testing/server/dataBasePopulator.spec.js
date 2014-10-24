'use strict';
var request = require('supertest');
var should = require('should');

var request = require('request');
var Populator = require('../../server/config/databasePopulator_v1.js');


var fetchedLegislators;

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