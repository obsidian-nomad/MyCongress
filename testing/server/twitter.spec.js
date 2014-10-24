'use strict';

var app = require('../../server/app');
var request = require('supertest');
var should = require('should');
var expect = require('chai').expect;

describe('GET /api/twitter', function() {

  it('GET request with Senator Tom Udall twitter account should respond with JSON array', function(done) {
    request(app)
      .get('/api/twitter/SenatorTomUdall')
      .expect(200)
      .end(function(err, res) {
        if (err) {return done(err);}
        expect(res.body[0].user['screen_name']).to.equal('SenatorTomUdall');
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});
