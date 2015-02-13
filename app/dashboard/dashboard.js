'use strict';

angular.module('app.dashboard', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        });
    }])

    .controller('DashboardCtrl',  ['$scope', function($scope) {
        $scope.programs = {
            programs : [
                {
                    name : "QA-tool"
                }
            ]
        };

        $scope.onSelectedProgram = function(program) {
            $scope.stages = {
                stages : [
                    {
                        name : "lol"
                    }
                ]
            };
        };
    }]);