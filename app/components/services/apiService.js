'use strict';

var webServices = angular.module('app.webServices', ['ngResource']);

webServices.factory('apiService', function ($resource, $rootScope, $q, $http, $log) {

    $http.get('manifest.webapp').
        success(function (data) {
            $rootScope.dhisApi = data.activities.dhis.href;
            $log.debug("Got dhisApi: " + $rootScope.dhisApi);
        }).error(function(data, status) {
           $log.error("Couldn't get dhisApi: " + status);
        });

    return {

        getPrograms: function() {
            return $resource($rootScope.dhisAPI + 'api/programs.json', {} ,{
                query: {isArray: false}
            });
        }
    };
});