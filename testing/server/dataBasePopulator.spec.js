// 'use strict';
// var request = require('supertest');
// var should = require('should');

// var request = require('request');
// var Populator = require('../../server/config/databasePopulator_v1.js');


// var fetchedLegislators;
// xdescribe('Unit testing helper methods by Inserting dummy callbacks\n', function(){
//   describe('Testing fetchLegislators()...\n', function(){

//     it('should get an array of legislator json objects from sunlight: ', function(done){
//       this.timeout(4000);
//       Populator.fetch(function(results){
//         fetchedLegislators = results.slice(0,10);
//         results.should.be.instanceof(Array);
//         results[0].should.be.an.instanceOf(Object).and.have.property('bioguide_id');
//         done();
//       });
//     });
//   });

//   xdescribe('Testing addInfluenceData()...\n', function(){
//     it('should leave legislators with new property transparency_id', function(done){
//       this.timeout(5000);
//       Populator.addInfluence(fetchedLegislators, function(results){
//         results[0].should.have.property('transparency_data_Id');      
//         results[1].should.have.property('transparency_data_Id');      
//         results[2].should.have.property('transparency_data_Id');  
//         results[3].should.have.property('transparency_data_Id');      
//         results[9].should.have.property('transparency_data_Id');      
//         done();
//       });
//     });

//     it('should leave legislators with new property top_Contributing_Industries', function(done){
//       this.timeout(5000);
//       Populator.addInfluence(fetchedLegislators, function(results){
//         results[0].should.have.property('top_Contributing_Industries');
//         done();
//       });
//     });
//   }); 
// });

// xdescribe('Testing importLegislators()...\n ', function(){
//   it('should send legislator data to db by interacting with lawmaker model', function(done){
//     this.timeout(10000);
//     Populator.testImport(fetchedLegislators, function(){
//       console.log('Check DB manually!!!!!!!!!!!!!!!!!!!!');
//       done();   
//     });
//   });
// });

// xdescribe('Integration testing entire database populator script.  (Commented out, this takes a while)\n', function(){
//   describe('Testing populateDb()...\n ', function(){
//     it('should complete the entire Process and populate the db.', function(done){
//       this.timeout(100000);
//       Populator.populateDb(function(){
//         console.log('Check DB manually');
//         done();   
//       });
//     });
//   });
// });
