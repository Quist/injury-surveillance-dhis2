'use strict';

describe('Dashboard module', function() {
    var ctrl;
    var scope;
    var programs;

    beforeEach(module('app.dashboard'));

    beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();
        programs = {data : []};
        ctrl = $controller('DashboardCtrl', {$scope : scope, programs : programs, serviceMediator : {}});

    }));

    it('controller should be defined', inject(function() {
        expect(ctrl).toBeDefined();
    }));

    it('should define programs on the scope', inject(function(){
        expect(scope.programs).toBeDefined();
    }));

    it('should have a onselected program function', inject(function(){
        expect(scope.onSelectedProgram).toBeDefined();
    }));

});