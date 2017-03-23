var vs = angular.module('vs');

vs.controller('AircraftController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
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
				window.location.href = '#/admin/aircraft';
			}
			
			alert(res.data.msg);
		});
	}
	
	$scope.updateAircraft = function(){
		var id = $routeParams.id;
		$http.put('/api/aircrafts/' + id, $scope.aircraft).then(function(res){
			
			if(res.data.success)
			{
				window.location.href = '#/admin/aircraft';
			}
			
			alert(res.data.msg);
		});
	}
	
	$scope.removeAircraft = function(id)
	{
		var deleteReg = window.confirm('Are you sure you want to delete?');
		if(deleteReg){
		
			$http.delete('/api/aircrafts/' + id, $scope.aircraft).then(function(res){
				
				if(res.data.success)
				{
					window.location.href = '#/admin/aircraft';
				}
				
				alert(res.data.msg);
			});
		}
	}
	
}]);