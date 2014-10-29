'use strict';

//Load in the App
var app = require('../../client/app/myCongress.services.js');

//Dependencies
require('angular-mocks');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should;



describe('Testing myCongress.services API Calls', function() {

	beforeEach(module('myCongress.services'));

	var Bills;
	var Politicians;
	var Profile;
	var $httpBackend;
	//Hardcoded the API info, change if you change these in the Factory
	var apikey = '?apikey=d5ac2a8391d94345b8e93d5c69dd8739';
	var apibase = 'https://congress.api.sunlightfoundation.com/';

	beforeEach(inject(function(_Bills_, _Politicians_, _Profile_, _$httpBackend_) {
		Bills = _Bills_;
		Politicians = _Politicians_;
		Profile = _Profile_;
		$httpBackend = _$httpBackend_;
	}))

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	})

	describe('Bills', function() {

		it('should send a HTTP GET Request', function() {
			$httpBackend.expectGET(apibase + 'bills' + apikey);
			Bills.getBills();
			$httpBackend.flush();
		});
	})   
});
