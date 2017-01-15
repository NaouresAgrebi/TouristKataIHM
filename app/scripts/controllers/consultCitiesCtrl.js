(function () {
    'use strict';
    
    /* @ngInject */
    angular.module('touristKataIhmApp').controller('consultCitiesCtrl', consultCitiesCtrl);

    function consultCitiesCtrl($rootScope,$scope,$route,$http,$log ,ngProgressFactory,urlTouristKataPropertiesService) {
        
         $scope.cities = [];  
         $scope.counters ={};  
		$scope.load = function(){		
            console.log(' load ..');
			$scope.progressbar = ngProgressFactory.createInstance();
            $scope.progressbar.setHeight('5px');
            $scope.progressbar.setColor('#FF8C00');
            $scope.sortType     = 'cityName'; // set the default sort type
            $scope.sortReverse  = false;  // set the default sort order
            $scope.searchCity   = '';     // set the default search/filter term
			$scope.consultCities();
			
		}

		$scope.consultCities = function(){  
            var url = urlTouristKataPropertiesService.urlConsultCities ;
            $scope.progressbar.start();
            $http.get(url).then (function(msg){
                $scope.cities = msg.data;
                $scope.getCounters();
                $scope.showDataTable = true;
                $scope.progressbar.complete(); 

			});
			
		};
        // nombre de visited & invisited
        $scope.getCounters  = function(){ 
            var url = urlTouristKataPropertiesService.urlCountersOfVisited ;
           // $scope.progressbar.start();
            $http.get(url).then (function(msg){
                $scope.counters = msg.data;
              //  $scope.progressbar.complete(); 

            });
        }
         














       }

})()