var myApp = angular.module('vs');

myApp.controller('PhotoAdmController', ['$scope', '$http', '$location', '$routeParams', '$window', function($scope, $http, $location, $routeParams, $window){

	$scope.load = function()
	{
		$http.get('/api/photos').then(function(response){
			$scope.photos = response;
			
			$scope.qtCivil = 0;
			$scope.qtMil = 0;
			$scope.qtPriv = 0;
			$scope.qtFln = 0;
			for(var i=0; i< $scope.photos.length; i++)
			{
				if(Number($scope.photos[i].cd_finalidade) == 1)
				{
					$scope.qtCivil++;
				}
				else if(Number($scope.photos[i].cd_finalidade) == 2)
				{
					$scope.qtMil++;
				}
				else if(Number($scope.photos[i].cd_finalidade) == 3)
				{
					$scope.qtPriv++;
				}
				else if(Number($scope.photos[i].cd_finalidade) == 4)
				{
					$scope.qtFln++;
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
	
		$scope.photo.cd_imagem = photoName;
		$('#photoThumb').attr('src', '../uploads/thumbs/' + photoName); 
		$('#photoThumb').css('display', 'block'); 
		$('#chose-photo').text('Alterar'); 
	}
	
	$scope.loadCombos = function()
	{
		$http.get('/api/types').success(function(response){
			$scope.types = response;
		});
		
		$http.get('/api/operators').success(function(response){
			$scope.operators = response;
		});
	}

	$scope.addPhoto = function(){
	
		$http.post('/api/photos', $scope.photo).success(function(response){
		
			window.location.href = '#/photos';
		});
	}
	
	$scope.getPhoto = function(){
		
		var photoId = $routeParams.id;
		$http.get('/api/photos/' + photoId).success(function(response){
		
			var photo = response[0];
			var photoDate = photo.dt_imagem;
			photo.dt_imagem = new Date(photoDate);
			photo.selectedSection = photo.cd_finalidade;
			$scope.photo = photo;
		
		});	
	}
	
}]);