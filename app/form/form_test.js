'use strict';

describe('Form module', function() {
    var formCtrl, scope, serviceMediator, routeParams, dataSet;

    beforeEach(module('app.form'));

    describe('form controller', function(){
        beforeEach(inject(function($controller, $rootScope){
            scope = $rootScope.$new();
            routeParams = {progId : 2545, stageId: 123};
            dataSet = {dataSet : []};
            formCtrl = $controller('FormCtrl',
                {$routeParams: routeParams, $scope : scope, dataSet : dataSet});
        }));

        it('should be defined', inject(function() {
            expect(formCtrl).toBeDefined();
        }));

        it('should define groups on the scope', inject( function(){
            expect(scope.groups).toBeDefined();
            expect(scope.groups.length).toBeDefined();
        }));
    });
});