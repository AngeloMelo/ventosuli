var myApp = angular.module('vs');

myApp.controller('PhotoController', ['$scope', '$http', '$location', '$routeParams', '$window', function($scope, $http, $location, $routeParams, $window){

	
	$scope.load = function()
	{
		$http.get('/api/photos').then(function(response){
			$scope.photos = response.data;
			
		
			for(var i=0; i< $scope.photos.length; i++)
			{
				if(Number($scope.photos[i].category_cd) == 1)
				{
					$scope.photos[i].category = 'Civil';
				}
				else if(Number($scope.photos[i].category_cd) == 2)
				{
					$scope.photos[i].category = 'Militar';
				}
				else if(Number($scope.photos[i].category_cd) == 3)
				{
					$scope.photos[i].category = 'Privado';
				}
				else if(Number($scope.photos[i].category_cd) == 4)
				{
					$scope.photos[i].category = 'Aeroporto';
				}
			}
		});
	}
	
	$scope.loadCiv = function()
	{
		$http.get('/api/photos?category_cd=1').then(function(response){
			$scope.photos = response.data;
		});
	}
	
	$scope.loadMil = function()
	{
		$http.get('/api/photos?category_cd=2').then(function(response){
			$scope.photos = response.data;
		});
	}
		
	$scope.loadPriv = function()
	{
		$http.get('/api/photos?category_cd=3').then(function(response){
			$scope.photos = response.data;
		});
	}
	
	$scope.loadFln = function()
	{
		$http.get('/api/photos?category_cd=4').then(function(response){
			$scope.photos = response.data;
		});
	}

	$scope.openPhotoDetail = function (id) {
	
		alert(id);

	};  

	
}]);