
describe('myCongress.services, ', function() {

	beforeEach(module('myCongress.services'));

	var Bills;
	var Politicians;
	var Profile;
	var Donors;
	var $httpBackend;
	//Hardcoded the API info, change if you change these in the Factory
	var apikey = '?apikey=d5ac2a8391d94345b8e93d5c69dd8739';
	var apibase = 'https://congress.api.sunlightfoundation.com/';
	var apitransparency = 'http://transparencydata.org/'

	beforeEach(inject(function($injector) {
		Bills = $injector.get('Bills');
		Politicians = $injector.get('Politicians');
		Profile = $injector.get('Profile');
		Donors = $injector.get('Donors');
		$httpBackend = $injector.get('$httpBackend');
	}))

	describe('Bills Factory, ', function() {

		it('expect getBills() to be a function and to be called', function() {
			expect(Bills.getBills).toEqual(jasmine.any(Function));
			spyOn(Bills, "getBills");
			Bills.getBills();
			expect(Bills.getBills).toHaveBeenCalled();
		});

		it('expect getBills() to send an HTTP GET Request', function() {
			$httpBackend.expectGET(apibase + 'bills' + apikey + '&order=scheduled_at')
			.respond(200,'Fake Data Response to GetBills()');
			Bills.getBills();
			$httpBackend.flush();
			$httpBackend.verifyNoOutstandingRequest();
			$httpBackend.verifyNoOutstandingExpectation();
		});
	});

	describe('Politicians Factory, ', function() {

		it('expect getReps() to be a function and to be called', function() {
			expect(Politicians.getReps).toEqual(jasmine.any(Function));
			spyOn(Politicians, "getReps");
			Politicians.getReps();
			expect(Politicians.getReps).toHaveBeenCalled();
		});

		it('expect getReps() to send an HTTP GET Request', function() {
			$httpBackend.expectGET(apibase + 'legislators' + apikey + '&per_page=all')
			.respond(200,'Fake Data Response to getReps()');
			Politicians.getReps();
			$httpBackend.flush();
			$httpBackend.verifyNoOutstandingRequest();
			$httpBackend.verifyNoOutstandingExpectation();
		});
	});

	describe('Donors Factory, ', function() {

		it('expect getPolitician() to be a function and to be called', function() {
			expect(Donors.getPolitician).toEqual(jasmine.any(Function));
			spyOn(Donors, "getPolitician");
			Donors.getPolitician();
			expect(Donors.getPolitician).toHaveBeenCalled();
		});

		it('expect getPolitician() to send an HTTP GET Request', function() {
			var name = 'Ron Paul';
			name = name.replace(/ /g, "+");
			$httpBackend.expectGET(apitransparency + 'api/1.0/entities.json' + apikey + '&type=politician&search=' + name)
			.respond(200,'Fake Data Response to getPolitician()');
			Donors.getPolitician('Ron Paul');
			$httpBackend.flush();
			$httpBackend.verifyNoOutstandingRequest();
			$httpBackend.verifyNoOutstandingExpectation();
		});
	});   
});
