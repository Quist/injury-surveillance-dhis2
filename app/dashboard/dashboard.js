'use strict';

angular.module('app.dashboard', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        });
    }])

    .controller('DashboardCtrl',  ['$q','$scope', 'serviceMediator', function($q, $scope, serviceMediator) {

        serviceMediator.CheckForApi().then(function() {
            //Fill this section with the initialization needed for the controller.
            serviceMediator.getPrograms().then(function(res){
                $scope.programs = res.data;
            }, function(err){
            });

        }, function () {
            //Check again
        });

        $scope.onSelectedProgram = function(program) {
            serviceMediator.getProgram(program.id).success(function(res){
                $scope.stages = res.programStages;
            });
        };
    }]);