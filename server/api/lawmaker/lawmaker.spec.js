'use strict';

var app = require('../../app');
var request = require('supertest');
var should = require('should');

describe('GET /api/lawmakers', function() {

  it('should respond with JSON array containing lawmaker objects', function(done) {
    request(app)
      .get('/api/lawmakers')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) {return done(err);}
        res.body.should.be.ok;
        res.body.should.be.instanceof(Array);
        //res.body.should.not.be.empty;        
        //res.body[0].should.have.property('bioguide_id');
        done();
      });
  });
});
