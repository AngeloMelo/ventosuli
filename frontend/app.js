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
	.when('/photos', {
		controller:'PhotoAdmController',
		templateUrl: '/views/admin/photos.html'
	})
	.when('/upload',{
		controller:'UsersController',
		templateUrl:'/views/upload.html'
	})
	.when('/admin/home',{
		controller:'AdminController',
		templateUrl:'/views/admin/admin.html'
	})
	.when('/admin/aircraft',{
		controller:'AircraftController',
		templateUrl:'views/admin/aircraft.html'
	})
	.when('/admin/aircrafts/edit/:id',{
		controller:'AircraftController',
		templateUrl:'views/admin/aircraft_edit.html'
	})
	.when('/admin/aircrafts/add',{
		controller:'AircraftController',
		templateUrl:'views/admin/aircraft_add.html'
	});
});