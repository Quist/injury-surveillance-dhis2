'use strict';

angular.module('app', [
    'ngRoute',
    'app.serviceMediator',
    'app.webServices',
    'app.builders',
    'app.dashboard',
    'app.form',
    'app.version'
]).

    config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/dashboard'});
    }]);
