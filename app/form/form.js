'use strict';

angular.module('app.form', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/form', {
        templateUrl: 'form/form.html',
        controller: 'FormCtrl'
      });
    }])

    .controller('FormCtrl', [function() {

    }]);