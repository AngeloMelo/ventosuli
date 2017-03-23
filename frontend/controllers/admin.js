var vs = angular.module('vs');

vs.controller('AdminController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	
	var LOCAL_TOKEN_KEY = 'jwtKey';
	
	$scope.openAircraftForm = function(){
		
		if(isAuthorized())
		{
			window.location.href = '#/admin/aircrafts';
		} else {
			alert("Please login to access admin area");
			window.location.href = '#/login';
		}
	}
	
	$scope.openOperatorForm = function(){
		
		if(isAuthorized())
		{
			window.location.href = '#/admin/operators';
		} else {
			alert("Please login to access admin area");
			window.location.href = '#/login';
		}
	}
	
	
	function isAuthorized(){
		return $http.defaults.headers.common.Authorization;
	}
	
		
}]);