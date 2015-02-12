'use strict';

describe('webService module', function() {
    beforeEach(module('app.webServices'));

    describe('apiService service', function() {
        var apiService;

        beforeEach(inject(function (_apiService_) {
            apiService = _apiService_;
        }));

        it('should be defined', function() {
            expect(apiService).toBeDefined();
        });
    });
});