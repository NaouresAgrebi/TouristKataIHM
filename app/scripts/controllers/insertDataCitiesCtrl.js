(function () {
    'use strict';
    
    /* @ngInject */
    angular.module('touristKataIhmApp').controller('insertDataCitiesCtrl', insertDataCitiesCtrl);

    function insertDataCitiesCtrl($rootScope,$scope,$window,$route,$http,$log ,ngProgressFactory,urlTouristKataPropertiesService) {
        
          
		$scope.load = function(){		
            $scope.citiesToInject = [];	
			$scope.disabledButton = false;
			$scope.showDataTable = false;
            $scope.toAdd = false;
            $scope.showAlert = false;
			$scope.progressbar = ngProgressFactory.createInstance();
            $scope.progressbar.setHeight('5px');
            $scope.progressbar.setColor('#FF8C00');
            $http.get('../../dataCities.json').then (function(msg){
                                                  $scope.citiesToInject = msg.data;
                                               });
			
		}


        $scope.insertData = function(){ 
            $scope.showAlert = false;
            var url = urlTouristKataPropertiesService.urlInsertJson ;                    
            $scope.showDataTable = false;
            $scope.toAdd = false;
            $scope.disabledButton = true;
            $scope.progressbar.start();
            $http.post(url, $scope.citiesToInject)
                    .then(function(data, status){
                        $log.info('Good !! ');
                         $scope.showAlert = true;
                        $scope.progressbar.complete();   
                    });
        };

        $scope.consultCities = function() {           
            $scope.showAlert = false;
            $scope.showDataTable = true;
            $scope.toAdd = false;
        };
        
        $scope.addCity = function() {
            $scope.showAlert = false;
            $scope.showDataTable = false;
            $scope.toAdd = true;
        }
        
    }

 })();