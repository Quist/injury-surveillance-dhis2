'use strict';

var webServices = angular.module('webServices', ['ngResource']);

webServices.factory('apiService', function ($resource, $rootScope, $q, $http) {

    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", "manifest.webapp", false);
    xhReq.send(null);

    var serverResponse = JSON.parse(xhReq.responseText);
    $rootScope.dhisAPI = serverResponse.activities.dhis.href;

    return {

        getPrograms: function() {
            return $resource($rootScope.dhisAPI + 'api/programs.json', {} ,{
                query: {isArray: false}
            });
        }
    };
});