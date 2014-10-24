'use strict';
var request = require('supertest');
var should = require('should');

var request = require('request');
var Populator = require('../../server/config/databasePopulator_v1.js');
//var _ = require('lodash');


describe('Testing fetchLegislators()...', function(){
  it('should get an array of legislator json objects from sunlight: ', function(done){
    Populator.fetch(function(results){
      results.should.be.instanceof(Array);
      results[0].should.be.an.instanceOf(Object).and.have.property('bioguide_id');
      done();
    });
  });
});
