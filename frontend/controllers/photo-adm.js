var myApp = angular.module('vs');

myApp.controller('PhotoAdmController', ['$scope', '$http', '$location', '$routeParams', '$window', '$uibModal', 'modalService',
	function($scope, $http, $location, $routeParams, $window, $uibModal, modalService){

	$scope.qtCivil = 0;
	$scope.qtMil = 0;
	$scope.qtPriv = 0;
	$scope.qtFln = 0;
	$scope.pageSize = 10;
	$scope.currentPage = 1;
	
	
	$scope.photo = {
		photo_cd :''
	}
	$scope.load = function()
	{
		$http.get('/api/photos').then(function(response){
			$scope.photos = response.data;
			
		
			for(var i=0; i< $scope.photos.length; i++)
			{
				if(Number($scope.photos[i].category_cd) == 1)
				{
					$scope.qtCivil++;
					$scope.photos[i].category = 'Civil';
				}
				else if(Number($scope.photos[i].category_cd) == 2)
				{
					$scope.qtMil++;
					$scope.photos[i].category = 'Militar';
				}
				else if(Number($scope.photos[i].category_cd) == 3)
				{
					$scope.qtPriv++;
					$scope.photos[i].category = 'Privado';
				}
				else if(Number($scope.photos[i].category_cd) == 4)
				{
					$scope.qtFln++;
					$scope.photos[i].category = 'Aeroporto';
				}
			}
		});
	}
	
	$scope.choseFile = function(){
	
		$('#photo-file').click();
		$('.progress-bar').text('0%');
		$('.progress-bar').width('0%');
	}
	
	
	$scope.doUpload = function(files) {

		if (files.length <= 0) return;
		
		// One or more files selected, process the file upload

		// create a FormData object which will be sent as the data payload in the
		// AJAX request
		var formData = new FormData();

		// loop through all the selected files
		for (var i = 0; i < files.length; i++) {
		
			var file = files[i];

			// add the files to formData object for the data payload
			formData.append('photo-file', file, file.name);
		}
	
	
		$.ajax({
			url: '/api/photos/upload',
			type: 'POST',
			data: formData,
			processData: false,
			contentType: false,
			success: function(data){
				$scope.showThumb(data);
			},
			xhr: function() {
				// create an XMLHttpRequest
				var xhr = new XMLHttpRequest();

				// listen to the 'progress' event
				xhr.upload.addEventListener('progress', function(evt) {

					if (evt.lengthComputable) {
						// calculate the percentage of upload completed
						var percentComplete = evt.loaded / evt.total;
						percentComplete = parseInt(percentComplete * 100);

						// update the Bootstrap progress bar with the new percentage
						$('.progress-bar').text(percentComplete + '%');
						$('.progress-bar').width(percentComplete + '%');

						// once the upload reaches 100%, set the progress bar text to done
						if (percentComplete === 100) {
							$('.progress-bar').html('Upload conclu&#237;do');
						}
					}

				}, false);

				return xhr;
			}
		});
	}
	
	$scope.showThumb = function(photoName){
	
		$scope.photo.photo_cd = photoName;
		$('#photoThumb').attr('src', '../uploads/thumbs/' + photoName); 
		$('#photoThumb').css('display', 'block'); 
		$('#chose-photo').text('Alterar'); 
	}
	
	$scope.loadCombos = function()
	{
		$http.get('/api/aircrafts').then(function(response){
			$scope.aircrafts = response.data;
		});
		
		$http.get('/api/operators').then(function(response){
			$scope.operators = response.data;
		});
		
		$http.get('/api/photographers').then(function(response){
			$scope.photographers = response.data;
		});		
	}

	$scope.addPhoto = function(){
	
		$http.post('/api/photos', $scope.photo).then(function(response){
		
			alert(response.data.msg);
			window.location.href = '#/admin/photos';
		});
	}
	
	$scope.getPhoto = function(){
		
		var photoId = $routeParams.id;
		$http.get('/api/photos/' + photoId).then(function(response){
		
			var photo = response.data;
			var photoDate = photo.photo_dt;
			photo.photo_dt = new Date(photoDate);
			photo.selectedCategory = photo.category_cd;
			$scope.photo = photo;
		
		});	
	}
	
	$scope.removePhoto = function(id){
	
		var modalRef = $uibModal.open({
			animation: true,
			templateUrl: 'remove-modal.html',
			size: 'sm',
			controller: ModalInstanceController
		});	
		modalRef.selPhoto = getPhoto($scope, id);;		
	}
	
	function showSuccessMessage(msg){
		$uibModal.open({
			animation: true,
			templateUrl: 'alert-modal.html',
			size: 'sm',
			controller: alertController
		});	
	}
	
	function ModalInstanceController($scope, $uibModalInstance) {

		var id = $uibModalInstance.selPhoto.photo_id;
		$scope.selPhoto = $uibModalInstance.selPhoto;
		
        $scope.ok = function() {
			
            $uibModalInstance.close();
			$http.delete('/api/photos/' + id).then(function(response){
			
				showSuccessMessage(response.data.msg);
				//window.location.href = '#/admin/photos';
			});
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
	
	
	function alertController($scope, $uibModalInstance) {

        $scope.ok = function() {
			
            $uibModalInstance.close();
        };
    }
	
	
	function getPhoto($scope, id)
	{
		for(var i=0; i< $scope.photos.length; i++)
		{
			if($scope.photos[i].photo_id == id) return $scope.photos[i];
		}
		
		return undefined;
	}
	
	$scope.editPhoto = function(){
	
		var id = $scope.photo.photo_id;
		$http.put('/api/photos/' + id, $scope.photo).then(function(response){
		
			alert(response.data.msg);
			window.location.href = '#/admin/photos';
		});
	
	}
	
}]);