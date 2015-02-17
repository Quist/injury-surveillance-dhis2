'use strict';

describe("Builders", function () {
    beforeEach(function(){
        this.addMatchers({
            toEqualData: function(expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    beforeEach(module('app.builders'));
    beforeEach(module('app.webServices'));
    beforeEach(module(function ($provide) {
        $provide.value('usSpinnerService', {});
    }));

    describe("dataSetBuilder", function () {
        var $httpBackend, $rootScope;
        var dataSetBuilder, apiService;

        beforeEach(inject(function (_$httpBackend_, _$rootScope_ , _dataSetBuilder_, _apiService_) {
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            dataSetBuilder = _dataSetBuilder_;
            apiService = _apiService_;

            $httpBackend.expectGET('manifest.webapp').respond({activities: {dhis: {testHref: "url"}}});
        }));

        it("Should be defined", function () {
            expect(dataSetBuilder).toBeDefined();
        });
    });
});