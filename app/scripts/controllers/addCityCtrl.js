(function () {
    'use strict';
    
    /* @ngInject */
    angular.module('touristKataIhmApp').controller('addCityCtrl', addCityCtrl);

    function addCityCtrl($rootScope,$scope,$route,$http,$log ,ngProgressFactory,urlTouristKataPropertiesService) {
   
     			$scope.city = {};
          $scope.city.visited = false;
     			$scope.city.country = {};
          $scope.city.country.countryId ='';
     			$scope.countries = [];
          $scope.attractionsInit = [];
          $scope.attractionModel =[];
          $scope.city.attractions   =[];
         
    	   	$scope.load = function(){

                //configurer la  select Multipl
                $scope.datasettings = {
                      showCheckAll: false,
                      showUncheckAll:false,
                      scrolable: true,
                      displayProp: 'attractionName',
                      idProp:'attractionId',
                      externalIdProp:'attractionId'
                 };
                $scope.customTexts = {
                      buttonDefaultText: 'Add Attraction Name',
                      dynamicButtonTextSuffix: 'Add Attraction Name'
                };	
                $scope.showMsgError = false;	
                $scope.showAlertCreated =false;
			         	$scope.progressbar = ngProgressFactory.createInstance();
              	$scope.progressbar.setHeight('5px');
            		$scope.progressbar.setColor('#FF8C00');
                // recuperer les countries ( from DB)
                $scope.getCountries();
                // recuperer les attractions ( from DB)
                $scope.getAttractionsInit();
        	}

          $scope.getAttractionsInit = function(){
                  var url = urlTouristKataPropertiesService.urlConsultAttractions ;
                  $http.get(url).then (function(msg){
                                  $scope.attractionsInit = msg.data;
                                 
                                });
           };
			    $scope.getCountries = function(){
                   var url = urlTouristKataPropertiesService.urlConsultCountries ;
                   $http.get(url).then (function(msg){
                                  $scope.countries = msg.data;
              
                                });

          };

          $scope.getAttractions = function(){
              if($scope.attractionModel && $scope.attractionsInit){
                angular.forEach($scope.attractionModel, function(value, key) {
                      angular.forEach($scope.attractionsInit, function(valueInit, keyInit) {
                          if(valueInit.attractionId == value.attractionId){
                                    $scope.city.attractions.push({
                                                    'attractionId':value.attractionId,
                                                    'attractionName':valueInit.attractionName
                                    });
                                    return;
                          }

                      });
                      
                });
              }
          }

          $scope.addCity = function(){
            $scope.showMsgError = false;
            $scope.showAlertCreated =false;
          //  console.log($scope.city.country);;
            var url = urlTouristKataPropertiesService.urlAddCity ;
            var urlCheckName = urlTouristKataPropertiesService.urlConsultCities+'/'+$scope.city.cityName;
            // get attraction to insert !
            $scope.getAttractions();
            angular.forEach($scope.countries , function(value, key) {
                  if(value.countryId == $scope.city.country.countryId){
                    $scope.city.country.countryName = value.countryName;
                    return;
                  }
            });                   
            $scope.progressbar.start();
            $http.get(urlCheckName).then (function(msg){
                            console.log(msg);
                            if(msg.status == '204'){                          
                                $http.post(url, $scope.city).then(function(data, status){
                                                      $scope.showAlertCreated = true;
                                                       $scope.progressbar.complete();   
                                        });
                           
                            }else{
                              $scope.showMsgError = true;
                              $scope.progressbar.complete();
                            }                       
                                 
             });
           
      
          }



   }

})();