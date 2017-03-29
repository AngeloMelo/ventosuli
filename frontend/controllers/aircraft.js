var vs = angular.module('vs');

vs.controller('AircraftController', ['$scope', '$http', '$location', '$routeParams', '$uibModal', 'modalService', function($scope, $http, $location, $routeParams, $uibModal, modalService){

	$scope.load = function(){
		$http.get('/api/aircrafts').then(function(res){
			$scope.aircrafts = res.data;
		});
	}
	
	$scope.getAircraft = function(){
		var id = $routeParams.id;
		$http.get('/api/aircrafts/' + id).then(function(response){
			$scope.aircraft = response.data;
		});
	}
	
	$scope.addAircraft = function(){

		$http.post('/api/aircrafts/', $scope.aircraft).then(function(res){
			if(res.data.success)
			{
				window.location.href = '#/admin/aircrafts';
			}
			
			alert(res.data.msg);
		});
	}
	
	$scope.updateAircraft = function(){
		var id = $routeParams.id;
		$http.put('/api/aircrafts/' + id, $scope.aircraft).then(function(res){
			
			if(res.data.success)
			{
				window.location.href = '#/admin/aircrafts';
			}
			
			alert(res.data.msg);
		});
	}
	
	$scope.removeAircraft = function(id)
	{
		$scope.aircraft = getAircraft(id);
		
		var modalOptions = {
			closeButtonText: 'Cancel',
			actionButtonText: 'Delete ',
			headerText: 'Delete Aircraft?',
			bodyText: 'Are you sure you want to delete ' + $scope.aircraft.aircraft_de
		};

		modalService.showModal({}, modalOptions).then(function (result) {
			
			$http.delete('/api/aircrafts/' + $scope.aircraft.aircraft_id, $scope.aircraft).then(function(res){
				
				if(res.data.success)
				{
					$scope.load();
				}
				
				alert(res.data.msg);
			});
		});
	}
	
	
	function getAircraft(id)
	{
		for(var i=0; i< $scope.aircrafts.length; i++)
		{
			if($scope.aircrafts[i].aircraft_id == id) return $scope.aircrafts[i];
		}
		return undefined;
	}
	
	
}]);