'use strict';

angular.module('app.dashboard', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl',
            resolve :  {
                programs: function (serviceMediator) {
                    return serviceMediator.getPrograms();
                }
            }
        });
    }])

    .controller('DashboardCtrl',  ['$q','$scope', '$interval', 'serviceMediator', 'programs',
        function($q, $scope, $interval, serviceMediator, programs) {
            $scope.programs = programs.data;

            $scope.onSelectedProgram = function(program) {
                serviceMediator.getProgram(program.id).success(function(res){
                    $scope.stages = res.programStages;
                });
            };
        }]);
