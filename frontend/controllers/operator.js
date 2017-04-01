var vs = angular.module('vs');

vs.controller('OperatorController', ['$scope', '$http', '$location', '$routeParams', 'modalService', 'messageBoxService',
	function($scope, $http, $location, $routeParams, modalService, messageBoxService){
	
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
				messageBoxService.showSuccess(res.data.msg);
			}
			else
			{
				messageBoxService.showError(res.data.msg);
			}
		});
	}
	
	$scope.updateOperator = function(){
		var id = $routeParams.id;
		$http.put('/api/operators/' + id, $scope.operator).then(function(res){
			
			if(res.data.success)
			{
				window.location.href = '#/admin/operators';
				messageBoxService.showSuccess(res.data.msg);
			}
			else
			{
				messageBoxService.showError(res.data.msg);
			}
		});
	}
	
	$scope.removeOperator = function(id)
	{	
		$scope.operator = getOperator(id);
		
		var modalOptions = {
			closeButtonText: 'Cancel',
			actionButtonText: 'Delete ',
			headerText: 'Delete operator?',
			bodyText: 'Are you sure you want to delete ' + $scope.operator.operator_de
		};

		modalService.showModal({}, modalOptions).then(function (result) {
			
			$http.delete('/api/operators/' + $scope.operator.operator_id, $scope.operator).then(function(res){
				if(res.data.success)
				{
					$scope.load();
					messageBoxService.showSuccess(res.data.msg);
				}
				else
				{
					messageBoxService.showError(res.data.msg);
				}
			});
		});
	}

	function getOperator(id)
	{
		for(var i=0; i< $scope.operators.length; i++)
		{
			if($scope.operators[i].operator_id == id) return $scope.operators[i];
		}
		return undefined;
	}	
}]);