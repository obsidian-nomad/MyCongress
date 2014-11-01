
describe('myCongress.services, ', function() {

	beforeEach(module('myCongressApp'));

	var Bills;
	var Politicians;
	var Profile;
	var Donors;
	var $httpBackend;
	var $controller;
	var $scope;
	
	//Hardcoded the API info, change if you change these in the Factory
	var api =  {
		key : '?apikey=d5ac2a8391d94345b8e93d5c69dd8739',
		sunlight : 'https://congress.api.sunlightfoundation.com/',
		transparency : 'http://transparencydata.org/'
	};

	beforeEach(inject(function($injector) {
		
		//Injector grabs the Factories Directly
		Bills = $injector.get('Bills');
		Politicians = $injector.get('Politicians');
		Profile = $injector.get('Profile');
		Donors = $injector.get('Donors');
		
		//Set up a mock server to respond to API requests
		$httpBackend = $injector.get('$httpBackend');
		
		//Use injector to grab the $rootScope
		$scope = $injector.get('$rootScope');

		//Use injector to grab the controller constructor, called $controller
		$controller = $injector.get('$controller');

		//Use the controller constructor to make a copy based on your Controller
		//Set its scope to RootScope
		createController = function() {
			return $controller('upcomingVotesController', {'$scope': $scope});
		};
	}));

	describe('Bills Factory, ', function() {

		it('expect getBills() to be a function and to be called', function() {
			expect(Bills.getBills).toEqual(jasmine.any(Function));
			spyOn(Bills, "getBills");
			Bills.getBills();
			expect(Bills.getBills).toHaveBeenCalled();
		});

		it('expect getBills() to send an HTTP GET Request', function() {
			$httpBackend.expectGET(api.sunlight + 'bills' + api.key + '&order=scheduled_at')
			.respond(200,'Fake Data Response to GetBills()');
			Bills.getBills();
			$httpBackend.flush();
			$httpBackend.verifyNoOutstandingRequest();
			$httpBackend.verifyNoOutstandingExpectation();
		});

		it('expect upcomingVotesController to call getUpcomingBills() on init and assign parsed response to $scope.upcomingBills', function() {
			var responseObj = {results: ['fake', 'results', 'array']};
			
			//"WhenGET" is a router and responds to any routes accordingly. "expectGET" routes, but also freaks out if it doesn't get a request.
			$httpBackend.whenGET(api.sunlight + 'upcoming_bills' + api.key + '&order=scheduled_at')
			.respond(200, responseObj);

			//This Get request starts a chain reaction of additional get requests, so I send it a 404 to stop it, because I'm just testing getUpcomingBills()
			$httpBackend.whenGET(api.sunlight + 'legislators/locate' + api.key + '&zip=undefined').
			respond(404);

			//Init controller, which autoruns getUpcomingBills()
			var controller = createController();

			//httpBackend.Flush tells the Server to processes pending HTTP Requests.  
			$httpBackend.flush();
			expect($scope.upcomingBills.toString()).toBe(responseObj.results.toString());
			
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
			$httpBackend.expectGET(api.sunlight + 'legislators' + api.key + '&per_page=all')
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
			$httpBackend.expectGET(api.transparency + 'api/1.0/entities.json' + api.key + '&type=politician&search=' + name)
			.respond(200,'Fake Data Response to getPolitician()');
			Donors.getPolitician('Ron Paul');
			$httpBackend.flush();
			$httpBackend.verifyNoOutstandingRequest();
			$httpBackend.verifyNoOutstandingExpectation();
		});

		it('expect getTopContributorsofPolitician() to send an HTTP GET Request', function() {
			var polId = '12345abcd';
			$httpBackend.expectGET(api.transparency + 'api/1.0/aggregates/pol/'+polId+'/contributors.json' + api.key)
			.respond(200,'Fake Data Response');
			Donors.getTopContributorsofPolitician('12345abcd');
			$httpBackend.flush();
			$httpBackend.verifyNoOutstandingRequest();
			$httpBackend.verifyNoOutstandingExpectation();
		});

		it('expect getTopSectorsofPolitician() to send an HTTP GET Request', function() {
			var polId = '12345abcd';
			$httpBackend.expectGET(api.transparency + 'api/1.0/aggregates/pol/'+polId+'/contributors/sectors.json' + api.key)
			.respond(200,'Fake Data Response');
			Donors.getTopSectorsofPolitician('12345abcd');
			$httpBackend.flush();
			$httpBackend.verifyNoOutstandingRequest();
			$httpBackend.verifyNoOutstandingExpectation();
		});

		it('expect getTopIndustriesofPolitician() to send an HTTP GET Request', function() {
			var polId = '12345abcd';
			$httpBackend.expectGET(api.transparency + 'api/1.0/aggregates/pol/'+polId+'/contributors/industries.json' + api.key)
			.respond(200,'Fake Data Response');
			Donors.getTopIndustriesofPolitician('12345abcd');
			$httpBackend.flush();
			$httpBackend.verifyNoOutstandingRequest();
			$httpBackend.verifyNoOutstandingExpectation();
		});
	});
});
