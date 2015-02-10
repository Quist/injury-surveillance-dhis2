'use strict';

describe("Builders", function () {
    beforeEach(module('app.builders'));
    beforeEach(module('app.webServices'));

    describe("dataSetBuilder", function () {
        var $httpBackend, scope;
        var dataSetBuilder, apiService;

        beforeEach(inject(function (_$httpBackend_, $rootScope , _dataSetBuilder_, _apiService_) {
            $httpBackend = _$httpBackend_;
            scope = $rootScope;
            dataSetBuilder = _dataSetBuilder_;
            apiService = _apiService_;
        }));

        it("Should be defined", function () {
            expect(dataSetBuilder).toBeDefined();
        });
    });
});