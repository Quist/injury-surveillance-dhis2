'use strict';

angular.module('app.form', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/form/:progId/:stageId', {
            templateUrl: 'form/form.html',
            controller: 'FormCtrl'
        });
    }])

    .controller('FormCtrl', ['dataSetBuilder', 'apiService', '$log', '$routeParams', '$scope',
        function(dataSetBuilder, apiService, $log, $routeParams, $scope) {
            var dataset;
            var dataElements;

            $scope.test = function() {
                var data = dataSetBuilder.buildDataSet($routeParams.stageId);
                dataset  = data.dataset;
                dataElements = data.dataElements;
            };
        }]);