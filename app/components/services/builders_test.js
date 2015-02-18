'use strict';

describe("Builders", function () {
    beforeEach(function(){
        this.addMatchers({
            toEqualData: function(expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    beforeEach(module('app.builders'));
    beforeEach(module('app.webServices'));
    beforeEach(module(function ($provide) {
        $provide.value('usSpinnerService', {spin: function(){}, stop: function(){}});
    }));

    describe("dataSetBuilder", function () {
        var $httpBackend, $rootScope, $q;
        var dataSetBuilder, apiService;
        var api = "www.myPage.com/";

        beforeEach(inject(function (_$httpBackend_, _$rootScope_ , _dataSetBuilder_, _apiService_, _$q_) {
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            $q = _$q_;
            dataSetBuilder = _dataSetBuilder_;
            apiService = _apiService_;

            $rootScope.dhisApi = api;
        }));

        it("Should be defined", function () {
            expect(dataSetBuilder).toBeDefined();
        });

        it("Builds dataSet correct", function () {
            $httpBackend.expectGET(api + 'programStages/1.json').respond(programStage());
            $httpBackend.expectGET(api + 'dataElements/1.json').respond(element1());
            $httpBackend.expectGET(api + 'dataElements/2.json').respond(element2());
            $httpBackend.expectGET(api + 'dataElements/3.json').respond(element3());
            $httpBackend.expectGET(api + 'dataElements/4.json').respond(element4());
            $httpBackend.expectGET(api + 'optionSets/1.json').respond({options: ["Test1", "Test2"]});

            var handler = jasmine.createSpy('success');
            dataSetBuilder.buildDataSet(1).then(handler);

            $httpBackend.flush();
            $rootScope.$digest();
            expect(handler).toHaveBeenCalledWith(expectedResult());
        });
    });

    function programStage() {
        return {
            "id": "hrrDaWUJ8wk",
            "name": "Single-Event QA-Tool",
            "displayName": "Single-Event QA-Tool",
            "programStageDataElements":
                [
                    {
                        "dataElement":
                        {
                            "id": "1",
                            "name": "Registry_Age"
                        }
                    },
                    {
                        "dataElement":
                        {
                            "id": "2",
                            "name": "Registry_Height"
                        }
                    },
                    {
                        "dataElement":
                        {
                            "id": "3",
                            "name": "Registry_Sex"
                        }
                    },
                    {
                        "dataElement":
                        {
                            "id": "4",
                            "name": "Database_Age"
                        }
                    }
                ]
        }
    }

    function element1() {
        return {
            shortName: "Element1",
            dataElementGroups: [{name: "firstGroup"}],
            type: "string"
        }
    }

    function element2() {
        return {
            shortName: "Element2",
            dataElementGroups: [{name: "myGroup"}],
            type: "string",
            optionSet: {
                id: "1"
            }
        }
    }

    function element3() {
        return {
            shortName: "Element3",
            dataElementGroups: [{name: "yourGroup"}],
            type: "string"
        }
    }

    function element4 () {
        return {
            shortName: "Element4",
            dataElementGroups: [{name: "yourGroup"}],
            type: "string"
        }
    }

    function expectedResult() {
        return {
            dataSet: [
                {
                    sectionTitle: "firstGroup",
                    dataElements: [
                        {
                            shortName: "Element1",
                            valueType: "string",
                            values: []
                        }
                    ]
                },
                {
                    sectionTitle: "myGroup",
                    dataElements: [
                        {
                            shortName: "Element2",
                            valueType: "string",
                            values: ["Test1", "Test2"]
                        }
                    ]
                },
                {
                    sectionTitle: "yourGroup",
                    dataElements: [
                        {
                            shortName: "Element3",
                            valueType: "string",
                            values: []
                        },
                        {
                            shortName: "Element4",
                            valueType: "string",
                            values: []
                        }
                    ]
                }
            ],
            dataElements: [
                {
                    shortName: "Element1",
                    dataElementGroups: [{name: "firstGroup"}],
                    type: "string"
                },
                {
                    shortName: "Element2",
                    dataElementGroups: [{name: "myGroup"}],
                    type: "string",
                     optionSet: {
                         id: "1"
                     }
                },
                {
                    shortName: "Element3",
                    dataElementGroups: [{name: "yourGroup"}],
                    type: "string"
                },
                {
                    shortName: "Element4",
                    dataElementGroups: [{name: "yourGroup"}],
                    type: "string"
                }
            ]
        }
    }
});