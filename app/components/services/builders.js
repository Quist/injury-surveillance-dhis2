'use strict';

var builders = angular.module('app.builders', ['ngResource']);

builders.factory('dataSetBuilder', function (apiService, $log, $q, usSpinnerService) {
    var dataset = [];
    var dataElements = [];

    function buildDataset(elementResponses) {
        angular.forEach(elementResponses, function(response) {
            var element = response.data;
            var sectionTitle;

            //TODO selecting group[1] for testing purposes on 5750-server.
            if(element.dataElementGroups.length === 0) {
                sectionTitle = "Not Grouped";
            } else {
                sectionTitle = element.dataElementGroups[0].name;
            }

            var newElement = {shortName: element.shortName, id: element.id, valueType: element.type, values: []};

            if('optionSet' in element) {
                apiService.getOptionSet(element.optionSet.id).then(function(result) {
                    newElement.values = result.data.options;
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
        return {dataSet: dataset, dataElements: dataElements};
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
            usSpinnerService.spin('loading-spinner');
            dataset = [];
            dataElements = [];

            var returnDeffered = $q.defer();
            var dataElementsPromises = [];

            apiService.getProgramStage(programStageId).then(function (result) {
                var elementList = result.data.programStageDataElements;
                angular.forEach(elementList, function (element) {
                    dataElementsPromises.push(apiService.getDataElement(element.dataElement.id));
                });

                $q.all(dataElementsPromises).then(function (elementResponses) {
                    usSpinnerService.stop('loading-spinner');
                    returnDeffered.resolve(buildDataset(elementResponses));
                }, function (reason) {
                    returnDeffered.reject(reason);
                });
            });

            return returnDeffered.promise;
        }
    };
});