'use strict';

/**
 * @ngdoc overview
 * @name touristKataIhmApp
 * @description
 * # touristKataIhmApp
 *
 * Main module of the application.
 */
angular
  .module('touristKataIhmApp', [
    'ngAnimate',
    'ngProgress',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.select2',
    'angularjs-dropdown-multiselect',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/insertData.html'
      })
      .otherwise({
        redirectTo: '/views/error.html'
      });
  })
  .run(function ($rootScope,$http,$log,urlTouristKataPropertiesService) {
     var configurationFile = 'resources/URLTouristKata.properties';
      $http
          .get(configurationFile)
          .then(function (response) {
                var responseData = response.data;
                if (responseData) {
                    urlTouristKataPropertiesService.setUrlInsertJson(responseData.urlInsertJson);
                    urlTouristKataPropertiesService.setUrlConsultCities(responseData.urlConsultCities);
                    urlTouristKataPropertiesService.setUrlConsultCountries(responseData.urlConsultCountries);
                    urlTouristKataPropertiesService.setUrlConsultAttractions(responseData.urlConsultAttractions);
                    urlTouristKataPropertiesService.setUrlCountersOfVisited(responseData.urlCountersOfVisited);
                    urlTouristKataPropertiesService.setUrlAddCity(responseData.urlAddCity);
                }else{
                    $log.error('Cannot get configuration file [' + configurationFile + ']');
                }
          });
  })

  
