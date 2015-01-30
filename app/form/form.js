'use strict';

angular.module('app.form', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/form', {
        templateUrl: 'form/form.html',
        controller: 'FormCtrl'
      });
    }])

    .controller('FormCtrl', ['$scope', function($scope) {
        $scope.groups = [
            {
                sectionTitle: "Basic info"
            },
            {
                sectionTitle: "Transportation"
            },
            {
                sectionTitle : "Diagnosis"
            }
        ];
    }]);