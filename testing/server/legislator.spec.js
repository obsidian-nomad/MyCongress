'use strict';

var app = require('../../server/app');
var request = require('supertest');
var should = require('should');

xdescribe('GET /api/legislators', function() {

  it('should respond with JSON array containing legislator objects', function(done) {
    request(app)
      .get('/api/legislators')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) {return done(err);}
        res.body.should.be.ok;
        res.body.should.be.instanceof(Array);

        res.body.should.not.be.empty;  
        res.body[0].should.have.properties('bioguide_id','birthday', 'chamber', 'contact_form', 'crp_id',
          'district','facebook_id','fec_ids','first_name','gender','govtrack_id','icpsr_id','in_office', 
          'last_name','lis_id','middle_name','name_suffix','nickname','oc_email','ocd_id','office','party',
          'phone','senate_class','state','state_name',  'state_rank','term_end','term_start','thomas_id','title',
          'twitter_id','votesmart_id','website','youtube_id');
        res.body.should.not.be.empty;        
        res.body[0].should.have.property('bioguide_id');
        done();
      });
  });
});

describe('GET /api/legislators/:id', function(){
  
});
