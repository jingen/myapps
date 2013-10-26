// generate image service
apps.factory('Image', function(){
  return {
    resize_method: "free"
  };
});

// build controller fo image resizing
apps.controller('ImageResize', ['$scope', '$http', '$state', 'Image',  function($scope, $http, $state, Image){

  $scope.image = Image;

// once the user provide image url, desired dimensions, enable the "resize" button and display "ready" label
  $scope.checkReady = function(){
    var image = $scope.image;
    if(
        ((typeof image.remote_image_url != "undefined" && image.remote_image_url != "") ||
          (typeof $scope.file != "undefined" && $scope.file != null))
        &&
        (
          (
            (typeof image.width != "undefined" && image.width != "") &&
            (typeof image.height != "undefined" && image.height != "")
          ) || 
          (typeof image.scale != "undefined" && image.scale != "")
        )
      ){
      $('#resizeBtn').removeAttr('disabled');
      $scope.ready = true;
    }else{
      $('#resizeBtn').attr('disabled','');
      $scope.ready = false;
    }
  };

//listening the change of the image url
  $scope.urlChange = function(){
    $scope.checkReady();
  }

//listening the change of the scale input
  $scope.scaleChange = function(){
    // users can only enter digits
    $scope.image.scale = $scope.image.scale.replace(/[^0-9]/, '');

    // indicating user if they enter the right data of the width or height
    var imageWidth = $('#imageWidth'),
        imageHeight = $('#imageHeight'),
        radioFit = $('#radioFit'),
        radioFill = $('#radioFill');
    if (typeof $scope.image.scale != "undefined" && $scope.image.scale != "") {
      $scope.scaleBadage = true;
      if($scope.image.scale > 0){
        $scope.scaleOk = true;
      }else{
        $scope.scaleOk = false;
      }

      imageWidth.attr('disabled', '');
      imageHeight.attr('disabled', '');
      $scope.image.resize_method = "free";
      radioFit.attr('disabled','');
      radioFill.attr('disabled','');
    }else{
      $scope.scaleBadage = false;
      imageWidth.removeAttr('disabled');
      imageHeight.removeAttr('disabled');
      radioFit.removeAttr('disabled');
      radioFill.removeAttr('disabled');
    };
    $scope.checkReady();
  };

// listening the change of the input of the desired width and the desired height
  $scope.dimensionChange = function(){
    if(typeof $scope.image.width != "undefined"){
      $scope.image.width = $scope.image.width.replace(/[^0-9]/, '');
      if ($scope.image.width != "") {
        $scope.widthBadage = true;
      }else{
        $scope.widthBadage = false;
      };
    }
    if(typeof $scope.image.height != "undefined"){
      $scope.image.height = $scope.image.height.replace(/[^0-9]/, '');
      if ($scope.image.height != "") {
        $scope.heightBadage = true;
      }else{
        $scope.heightBadage = false;
      };
    }

    var imageScale = $('#imageScale');
    if((typeof $scope.image.width != "undefined" && $scope.image.width != "") || (typeof $scope.image.height != "undefined" && $scope.image.height != "")){
      imageScale.attr('disabled', '');
      if($scope.image.width > 0){
        $scope.widthOk = true;
      }else{
        $scope.widthOk = false;
      }
      if($scope.image.height > 0){
        $scope.heightOk = true;
      }else{
        $scope.heightOk = false;
      }
    }else{
      $scope.widthBadage = false;
      $scope.heightBadage = false;
      imageScale.removeAttr('disabled');
    }
    $scope.checkReady();
  };
//upload image info is saved to $scope.file
  $scope.onFileSelect = function($files){
    $scope.file = $files[0];
    $scope.checkReady();
  };

// ajax, set user arguments to server for generating new image and send back the result
  $scope.createImage = function(){
    $scope.ready = false;
    $scope.failed = false;
    $scope.success = false;
    $scope.resizing = true;
    $scope.imageChanging = true;
    $http.uploadFile({
      url: '/images/generate',
      data: $scope.image,
      file: $scope.file
    }).success(function(data){
      $scope.$apply(function(){
        $scope.newImage = data;
        $scope.imageChanging = false;
        $scope.success = true;
      });
    }).error(function(data){
      $scope.$apply(function(){
        $scope.imageChanging = false;
        $scope.failed = true;
        $scope.resizing = false;
      });
    });
  };

  $scope.clearUpload = function(){
    $(".fileupload").fileupload("reset");
    $('#resizeBtn').attr('disabled','');
    $scope.file = null; 
  };

  $scope.clearURL = function(){
    $scope.image.remote_image_url = "";
    $('#resizeBtn').attr('disabled','');
  };
}]);


