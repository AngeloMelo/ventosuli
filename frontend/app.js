var vs = angular.module('vs', ['ngRoute', 'ui.bootstrap']);

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
	.when('/photos/civ', {
		controller:'PhotoController',
		templateUrl: '/views/civ.html'
	})
	.when('/photos/mil', {
		controller:'PhotoController',
		templateUrl: '/views/mil.html'
	})
	.when('/photos/priv', {
		controller:'PhotoController',
		templateUrl: '/views/priv.html'
	})
	.when('/photos/fln', {
		controller:'PhotoController',
		templateUrl: '/views/fln.html'
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
	})	
	.when('/admin/photographers/',{
		controller:'PhotographerController',
		templateUrl:'views/admin/photographer.html'
	})
	.when('/admin/photographers/edit/:id',{
		controller:'PhotographerController',
		templateUrl:'views/admin/photographer_edit.html'
	})
	.when('/admin/photographers/add',{
		controller:'PhotographerController',
		templateUrl:'views/admin/photographer_add.html'
	})	
	.when('/admin/photos/',{
		controller:'PhotoAdmController',
		templateUrl:'views/admin/photos.html'
	})
	.when('/admin/photos/edit/:id',{
		controller:'PhotoAdmController',
		templateUrl:'views/admin/photo_edit.html'
	})
	.when('/admin/photos/add',{
		controller:'PhotoAdmController',
		templateUrl:'views/admin/photo_add.html'
	})
	.when('/admin/logout',{
		controller:'UsersController',
		templateUrl:'views/admin/logout.html'
	});
});

vs.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  };
});

vs.filter('startFrom', function(){
	return function(data, start){
		if(!data) return;
		start = 0 + start;
		return data.slice(start);
	}
})