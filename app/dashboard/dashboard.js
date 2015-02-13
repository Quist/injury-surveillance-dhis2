'use strict';

angular.module('app.dashboard', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        });
    }])

    .controller('DashboardCtrl',  ['$scope', 'serviceMediator', '$timeout', function($scope, serviceMediator, $timeout) {
        $timeout(function(){
             serviceMediator.getPrograms().then(function(res){
                 $scope.programs = res.data;
            }, function(err){
            });
        }, 200);


        $scope.onSelectedProgram = function(program) {
            serviceMediator.getProgram(program.id).success(function(res){
                $scope.stages = res.programStages;
            });
        };
    }]);