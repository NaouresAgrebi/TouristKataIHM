'use strict';

angular.module('touristKataIhmApp').factory('urlTouristKataPropertiesService', ['$resource', function ($resource) {
    return {
        urlInsertJson: '',
        setUrlInsertJson: function (lurl) {
            this.urlInsertJson = lurl;
        },
        urlConsultCities: '',
 		setUrlConsultCities: function (lurl) {
            this.urlConsultCities = lurl;
        },
        urlConsultCountries: '',
 		setUrlConsultCountries: function (lurl) {
            this.urlConsultCountries = lurl;
        },
        urlConsultAttractions: '',
 		setUrlConsultAttractions: function (lurl) {
            this.urlConsultAttractions = lurl;
        },
        urlCountersOfVisited: '',
 		setUrlCountersOfVisited: function (lurl) {
            this.urlCountersOfVisited = lurl;
        },
        urlAddCity: '',
 		setUrlAddCity: function (lurl) {
            this.urlAddCity = lurl;
        }
    }
}]);