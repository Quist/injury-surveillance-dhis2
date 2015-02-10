'use strict';

var builders = angular.module('app.builders', ['ngResource']);

builders.factory('dataSetBuilder', function (apiService, $log, $q) {
    var dataset = [{}];
    var dataElements = [];

    function extractDataElements(elements) {
        angular.forEach(elements, function(element) {
            dataElements.push(element.data);
        });
    }

    function buildDataset() {
        angular.forEach(dataElements, function(element) {
            //TODO search for right section
            var sectionTitle = element.dataElementGroups[0].name;
            var section = findSection(sectionTitle);
            if(section.exist) {
                $log.debug("Adding to existing section: " + sectionTitle);
                section.data.dataElements.push({shortName: element.shortName, valueType: element.type});
            } else {
                $log.debug("Creating new section: " + sectionTitle);
                dataset.push({sectionTitle: sectionTitle, dataElements: [{shortName: element.shortName, valueType: element.type}]});
            }
        });
    }

    function findSection(sectionTitle) {
        for(var i = 0; i < dataset.length; i++) {
            if(sectionTitle == dataset[i].sectionTitle) {
                return {exist: true, data: dataset[i]};
            }
        }
        return {exist: false};
    }

    return {

        buildDataSet: function (programStageId) {
            var stageDeffered = $q.defer();
            var dataElementsPromises = [];

            apiService.getProgramStage(programStageId).get(function (programStage) {
                stageDeffered.resolve(programStage.programStageDataElements);
            }, function(reason) {
                $log.error("Failed getting programStage: " + reason);
                stageDeffered.reject(reason);
            });

            stageDeffered.promise.then(function (elementList) {
                $log.debug("Getting dataElements");
                for(var i = 0; i < elementList.length; i++) {
                    var elementId = elementList[i].dataElement.id;
                    dataElementsPromises.push(apiService.getDataElement(elementId));
                }
                $q.all(dataElementsPromises).then(function (elements) {
                    extractDataElements(elements);
                    buildDataset();
                });
            });

            return {dataset: dataset, dataElememnts: dataElements};
        }
    };
});