'use strict';

var webServices = angular.module('app.webServices', ['ngResource']);

webServices.factory('apiService', function ($resource, $rootScope, $q, $http, $log) {

    $http.get('manifest.webapp').
        success(function (data) {
            $rootScope.dhisApi = data.activities.dhis.testHref;
            $log.debug("Got dhisApi: " + $rootScope.dhisApi);
        }).error(function(data, status) {
            $log.error("Couldn't get dhisApi: " + status);
        });

    return {

        getPrograms: function() {
            return $resource($rootScope.dhisApi + 'programs.json', {} ,{
                query: {isArray: false}
            });
        },

        getProgramStage: function(id) {
            return $resource($rootScope.dhisApi + 'programStages/' + id + '.json', {}, {
                query: {isArray: false}
            });
        },

        getDataElement: function(id) {
            return $http({method: 'GET', url: $rootScope.dhisApi + 'dataElements/' + id + '.json', cache: true});
        },

        getOptionSet: function(id) {
            return $resource($rootScope.dhisApi + 'optionSets/' + id + '.json', {}, {
                query: {isArray: false}
            });
        }
    };
});

