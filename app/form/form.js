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
            }
        });
    }])
    .controller('FormCtrl', ['$routeParams', '$scope','$interval', 'dataSet',
        function($routeParams, $scope, $interval, dataSet) {
            $scope.groups = dataSet.dataSet;

            var fakeData = [
                {
                    sectionTitle: "Basic info",
                    dataElements : [
                        {
                            shortName : "Age",
                            valueType : "Number"
                        },
                        {
                            shortName : "Occupation",
                            valueType : "Multi-Text"
                        },
                        {
                            shortName : "Sex",
                            valueType : "Radio",
                            values : [
                                "Male", "Female", "Other"
                            ]
                        }, {
                            shortName : "Date of injury",
                            valueType : "Date"
                        },
                        {
                            shortName: "Time of admission",
                            valueType: "Date"
                        }
                    ]
                },
                {
                    sectionTitle: "Transportation",
                    dataElements : [
                        {
                            shortName : "From the site of injury",
                            valueType : "Text"
                        }
                    ]
                },
                {
                    sectionTitle : "Diagnosis"
                }
            ];
        }]);
