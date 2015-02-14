'use strict';

var serviceMediator = angular.module('app.serviceMediator', ['ngResource']);

serviceMediator.factory('serviceMediator', function (dataSetBuilder, apiService, $rootScope, $q) {

    return {

        CheckForApi: function() {
            if('dhisApi' in $rootScope) {
                return $q.when([]);
            }
            return apiService.readApiUrl();
        },

        getDataSet: function(programStageId) {
            return dataSetBuilder.buildDataSet(programStageId);
        },

        getPrograms: function() {
            return apiService.getPrograms();
        },

        getProgram: function(id) {
            return apiService.getProgram(id);
        }

    };
});