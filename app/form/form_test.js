'use strict';

describe('Form module', function() {
    var formCtrl, scope, serviceMediator, routeParams, dataSet;

    beforeEach(module('app.form'));
    beforeEach(module('app.builders'));
    beforeEach(module('app.webServices'));
    beforeEach(module('app.serviceMediator'));

    describe('form controller', function(){
        beforeEach(inject(function($controller, $rootScope, _serviceMediator_){
            scope = $rootScope.$new();
            serviceMediator = _serviceMediator_;
            routeParams = {progId : 2545, stageId: 123};
            dataSet = {dataSet : []};
            formCtrl = $controller('FormCtrl',
                {$routeParams: routeParams, $scope : scope, serviceMediator: serviceMediator, dataSet : dataSet});
        }));

        it('should be defined', inject(function() {
            expect(formCtrl).toBeDefined();
        }));

        it('should define groups on the scope', inject( function(){
            expect(scope.groups).toBeDefined();
            expect(scope.groups.length).toBeDefined();
        }));

        it('should define the services', inject(function () {
            expect(serviceMediator).toBeDefined();
        }));
    });
});