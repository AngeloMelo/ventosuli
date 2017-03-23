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
	.when('/admin/aircrafts',{
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
	})
	.when('/admin/operators/',{
		controller:'OperatorController',
		templateUrl:'views/admin/operator.html'
	})
	.when('/admin/operators/edit/:id',{
		controller:'OperatorController',
		templateUrl:'views/admin/operator_edit.html'
	})
	.when('/admin/operators/add',{
		controller:'OperatorController',
		templateUrl:'views/admin/operator_add.html'
	});
});