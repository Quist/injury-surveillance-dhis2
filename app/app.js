'use strict';

angular.module('app', [
  'ngRoute',
  'app.dashboard',
  'app.form',
  'app.version'
]).

    config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({redirectTo: '/dashboard'});
    }]);
