'use strict';

angular.module('app.errorPage', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/error', {
            templateUrl: 'error_page/error.html',
            controller: 'ErrorPageCtrl'
        });
    }])

    .controller('ErrorPageCtrl', [function() {
    }]);