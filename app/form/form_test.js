'use strict';

describe('app.form module', function() {
    var formCtrl, scope, dataSetBuilder, apiService, routeParams;

    beforeEach(module('app.form'));
    beforeEach(module('app.builders'));
    beforeEach(module('app.webServices'));

    describe('form controller', function(){
        beforeEach(inject(function($controller, $rootScope, _dataSetBuilder_, _apiService_){
            scope = $rootScope.$new();
            dataSetBuilder = _dataSetBuilder_;
            apiService = _apiService_;
            routeParams = {progId : 2545, stageId: 123};
            formCtrl = $controller('FormCtrl',
                {$routeParams: routeParams, $scope : scope, dataSetBuilder: dataSetBuilder});
        }));

        it('should be defined', inject(function() {
            expect(formCtrl).toBeDefined();
        }));

        it('should define groups on the scope', inject( function(){
            expect(scope.groups).toBeDefined();
            expect(scope.groups.length).toBeDefined();
        }));

        it('should define the services', inject(function () {
            expect(dataSetBuilder).toBeDefined();
            expect(apiService).toBeDefined();
        }));
    });
});