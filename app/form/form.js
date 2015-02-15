'use strict';

angular.module('app.form', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/form/:progId/:stageId', {
            templateUrl: 'form/form.html',
            controller: 'FormCtrl'
        });
    }])
    .controller('FormCtrl', ['$routeParams', '$scope','$interval', 'serviceMediator',
        function($routeParams, $scope, $interval, serviceMediator) {

            initCtrl();
            var initPromise = $interval(initCtrl, 2000);
            function initCtrl() {
                serviceMediator.CheckForApi().then(function () {
                    //Fill this section with the initialization needed for the controller.
                    $interval.cancel(initPromise);
                    serviceMediator.getDataSet($routeParams.stageId).then(function (res) {
                        $scope.groups = res.dataSet;
                    });
                });
            }

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
