'use strict';

describe('app.dashboard module', function() {
    var ctrl;
    var scope;

    beforeEach(module('app.dashboard'));
    beforeEach(module('app.serviceMediator'));
    beforeEach(module('app.builders'));
    beforeEach(module('app.webServices'));

    describe('dashboard', function() {

        beforeEach(inject(function($controller, $rootScope){
            scope = $rootScope.$new();
            ctrl = $controller('DashboardCtrl', {$scope : scope});
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
});