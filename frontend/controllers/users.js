var vs = angular.module('vs');

vs.controller('UsersController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	
	var LOCAL_TOKEN_KEY = 'jwtKey';
	var isAuthenticated = false;
	$scope.user = {
		name: '',
		password: ''
	}
	
	$scope.login = function(){
	
		$http.post('/api/login', $scope.user).then(function(response){
		
			if (response.data.success) {
				storeUserCredentials(response.data.token);
				window.location.href = '#/admin/home';
			} else {
				alert(response.data.msg);
			}
		});
	}	
	
	
	$scope.signup = function(){
	
		$http.post('/api/signup', $scope.user).then(function(response){
		
			if (response.data.success) {
				window.location.href = '#/login';
			} 
			alert(response.data.msg);
		});
	}
	
	$scope.logout = function(){
	
		destroyUserCredentials();
		window.location.href = '#/home';
	}
	
	
	$scope.testmemberarea = function(){
	
		$http.get('/api/memberinfo').then(function(response){
		
			if (response.data.success) {
				alert(response.data.msg);
			} else {
				alert(response.data.msg);
			}
		});
	}
	
	
	function storeUserCredentials(token){
		window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
		useCredentials(token);
	}
	
	
	function useCredentials(token) {
		isAuthenticated = true;
		authToken = token;
	 
		// Set the token as header for your requests!
		$http.defaults.headers.common.Authorization = authToken;
	}
	
	
	function destroyUserCredentials() {
		authToken = undefined;
		isAuthenticated = false;
		$http.defaults.headers.common.Authorization = undefined;
		window.localStorage.removeItem(LOCAL_TOKEN_KEY);
	}
		
}]);