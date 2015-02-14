'use strict';

var webServices = angular.module('app.webServices', []);

webServices.factory('apiService', function ($rootScope, $q, $http, $log) {

    return {

        readApiUrl: function () {
            var deffered = $q.defer();
            $http.get('manifest.webapp').success(function (data) {
                $rootScope.dhisApi = data.activities.dhis.testHref;
                deffered.resolve(data);
                $log.debug("Got dhisApi: " + $rootScope.dhisApi);
            }).error(function(data, status) {
                $log.error("Couldn't get dhisApi: " + status);
                deffered.reject(data);
            });
            return deffered.promise;
        },

        getPrograms: function() {
            return $http({method: 'GET', url: $rootScope.dhisApi + 'programs.json'});
        },

        getProgram: function (id) {
            return $http({method: 'GET', url: $rootScope.dhisApi + 'programs/' + id + '.json'});
        },

        getProgramStage: function(id) {
            return $http({method: 'GET', url: $rootScope.dhisApi + 'programStages/' + id + '.json'});
        },

        getDataElement: function(id) {
            return $http({method: 'GET', url: $rootScope.dhisApi + 'dataElements/' + id + '.json'});
        },

        getOptionSet: function(id) {
            return $http({method: 'GET', url: $rootScope.dhisApi + 'optionSets/' + id + '.json'});
        }
    };
});

