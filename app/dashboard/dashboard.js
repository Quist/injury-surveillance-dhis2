'use strict';

angular.module('app.dashboard', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        });
    }])

    .controller('DashboardCtrl',  ['$q','$scope', '$interval', 'serviceMediator',
        function($q, $scope, $interval, serviceMediator) {

            initCtrl();
            var initPromise = $interval(initCtrl, 2000);
            function initCtrl() {
                serviceMediator.CheckForApi().then(function () {
                    //Fill this section with the initialization needed for the controller.
                    $interval.cancel(initPromise);
                    serviceMediator.getPrograms().then(function (res) {
                        $scope.programs = res.data;
                    });
                });
            }

            $scope.onSelectedProgram = function(program) {
                serviceMediator.getProgram(program.id).success(function(res){
                    $scope.stages = res.programStages;
                });
            };
        }]);