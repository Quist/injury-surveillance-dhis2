'use strict';

angular.module('app.form', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/form/:progId/:stageId', {
            templateUrl: 'form/form.html',
            controller: 'FormCtrl'
        });
    }])
    .controller('FormCtrl', ['$routeParams', '$scope', 'serviceMediator',
        function($routeParams, $scope, serviceMediator) {
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
            $scope.groups = fakeData;
        }]);
