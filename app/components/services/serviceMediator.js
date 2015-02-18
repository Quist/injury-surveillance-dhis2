'use strict';

var serviceMediator = angular.module('app.serviceMediator', ['ngResource']);

serviceMediator.factory('serviceMediator', function (dataSetBuilder, apiService, $rootScope, $q, $timeout) {

    function checkForApi() {
        if('dhisApi' in $rootScope) {
            return $q.when([]);
        }
        return apiService.readApiUrl();
    }

    return {

        getDataSet: function(programStageId) {
            return checkForApi().then(function () {
                return dataSetBuilder.buildDataSet(programStageId);
            }, function (data) {
                return $q.reject(data);
            });
        },

        getPrograms: function() {
           return checkForApi().then(function () {
                return apiService.getPrograms();
            }, function (data) {
                return $q.reject(data);
            });
        },

        getProgram: function(id) {
            return apiService.getProgram(id);
        }

    };
});