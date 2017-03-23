var vs = angular.module('vs');

vs.controller('OperatorController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	$scope.load = function(){
		$http.get('/api/operators').then(function(res){
			$scope.operators = res.data;
		});
	}
	
	$scope.getOperator = function(){
		var id = $routeParams.id;
		$http.get('/api/operators/' + id).then(function(response){
			$scope.operator = response.data;
		});
	}
	
	$scope.addOperator = function(){

		$http.post('/api/operators/', $scope.operator).then(function(res){
			if(res.data.success)
			{
				window.location.href = '#/admin/operators';
			}
			
			alert(res.data.msg);
		});
	}
	
	$scope.updateOperator = function(){
		var id = $routeParams.id;
		$http.put('/api/operators/' + id, $scope.operator).then(function(res){
			
			if(res.data.success)
			{
				window.location.href = '#/admin/operators';
			}
			
			alert(res.data.msg);
		});
	}
	
	$scope.removeOperator = function(id)
	{
		var deleteReg = window.confirm('Are you sure you want to delete?');
		if(deleteReg){
		
			$http.delete('/api/operators/' + id, $scope.operator).then(function(res){
				
				if(res.data.success)
				{
					window.location.href = '#/admin/operators';
				}
				
				alert(res.data.msg);
			});
		}
	}
	
}]);