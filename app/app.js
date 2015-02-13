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
    }]).

    run(['$rootScope', '$http', '$log', function($rootScope, $http, $log) {
        $http.get('manifest.webapp').
            success(function (data) {
                $rootScope.dhisApi = data.activities.dhis.testHref;
                $log.debug("Got dhisApi: " + $rootScope.dhisApi);
            }).error(function(data, status) {
                $log.error("Couldn't get dhisApi: " + status);
            });
    }]);
