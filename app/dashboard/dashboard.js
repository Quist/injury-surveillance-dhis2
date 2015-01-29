'use strict';

angular.module('app.dashboard', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/dashboard', {
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardCtrl'
      });
    }])

    .controller('DashboardCtrl', [function() {
        console.log("Hello?");
    }]);