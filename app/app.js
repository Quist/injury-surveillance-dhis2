'use strict';

var app = angular.module('app', [
    'ngRoute',
    'app.serviceMediator',
    'app.webServices',
    'app.builders',
    'app.dashboard',
    'app.form',
    'app.version',
    'angularSpinner'
]);


app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/dashboard'});
}]);

