var vs = angular.module('vs');

vs.controller('PhotographerController', ['$scope', '$http', '$location', '$routeParams', 'modalService', 'messageBoxService',
	function($scope, $http, $location, $routeParams, modalService, messageBoxService){
	
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
				messageBoxService.showSuccess(res.data.msg);
			}
			else
			{
				messageBoxService.showError(res.data.msg);
			}
		});
	}
	
	$scope.updatePhotographer = function(){
		var id = $routeParams.id;
		$http.put('/api/photographers/' + id, $scope.photographer).then(function(res){
			
			if(res.data.success)
			{
				window.location.href = '#/admin/photographers';
				messageBoxService.showSuccess(res.data.msg);
			}
			else
			{
				messageBoxService.showError(res.data.msg);
			}
		});
	}
	
	$scope.removePhotographer = function(id)
	{
		$scope.photographer = getPhotographer(id);
		
		var modalOptions = {
			closeButtonText: 'Cancel',
			actionButtonText: 'Delete ',
			headerText: 'Delete photographer?',
			bodyText: 'Are you sure you want to delete ' + $scope.photographer.photographer_nm
		};

		modalService.showModal({}, modalOptions).then(function (result) {
			
			$http.delete('/api/photographers/' + $scope.photographer.photographer_id, $scope.photographer).then(function(res){
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

	function getPhotographer(id)
	{
		for(var i=0; i< $scope.photographers.length; i++)
		{
			if($scope.photographers[i].photographer_id == id) return $scope.photographers[i];
		}
		return undefined;
	}	
	
}]);