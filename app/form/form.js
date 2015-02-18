'use strict';

angular.module('app.form', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/form/:progId/:stageId', {
            templateUrl: 'form/form.html',
            controller: 'FormCtrl',
            resolve: {
                dataSet: function (serviceMediator, $route) {
                    return serviceMediator.getDataSet($route.current.params.stageId);
                }
            },
            reloadOnSearch : false
        });
    }])

    .run(['$anchorScroll', function($anchorScroll) {
        $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
    }])

    .controller('FormCtrl', ['$scope','$location', '$anchorScroll', 'dataSet',
        function($scope, $location,$anchorScroll, dataSet) {
            $scope.groups = dataSet.dataSet;

            $scope.onNavItemClick = function(item){
                $location.hash(item.$$hashKey);
                $anchorScroll();
            };
        }]);
