
describe('myCongress.services, ', function() {

	beforeEach(module('myCongress.services'));

	var Bills;
	var Politicians;
	var Profile;
	var $httpBackend;
	//Hardcoded the API info, change if you change these in the Factory
	var apikey = '?apikey=d5ac2a8391d94345b8e93d5c69dd8739';
	var apibase = 'https://congress.api.sunlightfoundation.com/';


	beforeEach(inject(function($injector) {
		Bills = $injector.get('Bills');
		Politicians = $injector.get('Politicians');
		Profile = $injector.get('Profile');
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
			$httpBackend.expectGET(apibase + 'bills' + apikey)
			.respond(200,'Fake Data Response to GetBills()');
			Bills.getBills();
			$httpBackend.flush();
			$httpBackend.verifyNoOutstandingRequest();
			$httpBackend.verifyNoOutstandingExpectation();
		});

	});   
});
