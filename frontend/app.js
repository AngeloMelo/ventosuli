var vs = angular.module('vs', ['ngRoute']);

vs.config(function($routeProvider, $locationProvider){
	$locationProvider.hashPrefix('');
	$routeProvider.when('/login',{
		controller:'UsersController',
		templateUrl:'/views/login.html'
	})
	.when('/signup',{
		controller:'UsersController',
		templateUrl:'/views/signup.html'
	})
	.when('/logout',{
		controller:'UsersController',
		templateUrl:'/views/home.html'
	})
	.when('/photos',{
		controller:'UsersController',
		templateUrl:'/views/photos.html'
	})
	.when('/upload',{
		controller:'UsersController',
		templateUrl:'/views/upload.html'
	});
});
