'use strict';

describe('webService module', function() {
    beforeEach(module('app.webServices'));

    describe('apiService service', function() {
        var $httpBackend, $rootScope;
        var apiService;

        beforeEach(inject(function (_$httpBackend_, _$rootScope_, _apiService_) {
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            apiService = _apiService_;
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should be defined', function() {
            expect(apiService).toBeDefined();
        });

        it('should insert api correct', function () {
            $httpBackend.expectGET('manifest.webapp').respond({activities: {dhis: { href: "myPage"}}});

            var spy = jasmine.createSpy('success');
            apiService.readApiUrl().then(spy);
            $httpBackend.flush();
            $rootScope.$digest();

            expect(spy).toHaveBeenCalledWith({activities: {dhis: { href: "myPage"}}});
            expect($rootScope.dhisApi).toEqual("myPage");
        });
    });
});