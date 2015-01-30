'use strict';

describe('app.form module', function() {
  var formCtrl;
  var scope;

  beforeEach(module('app.form'));

  describe('form controller', function(){
    beforeEach(inject(function($controller, $rootScope){
      scope = $rootScope.$new();
      formCtrl = $controller('FormCtrl', {$scope : scope});
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