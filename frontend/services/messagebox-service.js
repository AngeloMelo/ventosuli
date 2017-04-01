angular.module('vs').service('messageBoxService', ['$uibModal', function ($uibModal) {

    var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: '../partials/message-box.html'
    };

	var modalOptions = {};
	var tempModalOptions = {};
	
	this.showSuccess = function(message){
		tempModalOptions = { typeclass : 'success', glyphtype: 'chevron-down'};
		this.show(message);
	}
	
	this.showWarning = function(message){
		tempModalOptions = { typeclass : 'warning', glyphtype: 'info-sign'};
		this.show(message);
	}
	
	this.showError = function(message){
		tempModalOptions = { typeclass : 'error', glyphtype: 'remove-sign'};
		this.show(message);
	}
	
    this.show = function (message) {
        //Create temp objects to work with since we're in a singleton service
        var tempModalDefaults = {size : 'sm'};
        
		
		var customModalDefaults = { backdrop : 'static'};
		var customModalOptions = {
			actionButtonText: 'OK',
			bodyText: message
		};

        //Map angular-ui modal custom defaults to modal defaults defined in service
        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

        //Map modal.html $scope custom properties to defaults defined in service
        angular.extend(tempModalOptions, modalOptions, customModalOptions);

        if (!tempModalDefaults.controller) {
            tempModalDefaults.controller = function ($scope, $uibModalInstance) {
                $scope.modalOptions = tempModalOptions;
                $scope.modalOptions.ok = function (result) {
                    $uibModalInstance.close(result);
                };
            };
        }

        return $uibModal.open(tempModalDefaults).result;
    };
}]);