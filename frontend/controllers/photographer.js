var vs = angular.module('vs');

vs.controller('PhotographerController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	$scope.load = function(){
		$http.get('/api/photographers').then(function(res){
			$scope.photographers = res.data;
		});
	}
	
	$scope.getPhotographer = function(){
		var id = $routeParams.id;
		$http.get('/api/photographers/' + id).then(function(response){
			$scope.photographer = response.data;
		});
	}
	
	$scope.addPhotographer = function(){

		$http.post('/api/photographers/', $scope.photographer).then(function(res){
			if(res.data.success)
			{
				window.location.href = '#/admin/photographers';
			}
			
			alert(res.data.msg);
		});
	}
	
	$scope.updatePhotographer = function(){
		var id = $routeParams.id;
		$http.put('/api/photographers/' + id, $scope.photographer).then(function(res){
			
			if(res.data.success)
			{
				window.location.href = '#/admin/photographers';
			}
			
			alert(res.data.msg);
		});
	}
	
	$scope.removePhotographer = function(id)
	{
		var deleteReg = window.confirm('Are you sure you want to delete?');
		if(deleteReg){
		
			$http.delete('/api/photographers/' + id, $scope.photographer).then(function(res){
				
				if(res.data.success)
				{
					window.location.href = '#/admin/photographers';
				}
				
				alert(res.data.msg);
			});
		}
	}
	
}]);