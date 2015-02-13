'use strict';

var webServices = angular.module('app.webServices', []);

webServices.factory('apiService', function ($rootScope, $q, $http) {

    return {

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

