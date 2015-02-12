'use strict';

var builders = angular.module('app.builders', ['ngResource']);

builders.factory('dataSetBuilder', function (apiService, $log, $q) {
    var dataset = [{}];
    var dataElements = [];

    function buildDataset(elementResponses) {
        angular.forEach(elementResponses, function(response) {
            var element = response.data;
            var sectionTitle = element.dataElementGroups[1].name;
            var newElement = {shortName: element.shortName, valueType: element.type, values: []};

            if('optionSet' in element) {
                apiService.getOptionSet(element.optionSet.id).get(function (optionSet) {
                    newElement.values = optionSet.options;
                });
            }

            var section = findSection(sectionTitle);
            if(section.exist) {
                $log.debug("Adding to existing section: " + sectionTitle);
                section.data.dataElements.push(newElement);
            } else {
                $log.debug("Creating new section: " + sectionTitle);
                dataset.push({sectionTitle: sectionTitle,dataElements: [newElement]});
            }

            dataElements.push(element);
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
                angular.forEach(elementList, function (element) {
                    dataElementsPromises.push(apiService.getDataElement(element.dataElement.id));
                });

                $q.all(dataElementsPromises).then(function (elementResponses) {
                    buildDataset(elementResponses);
                });
            });

            return {dataset: dataset, dataElememnts: dataElements};
        }
    };
});