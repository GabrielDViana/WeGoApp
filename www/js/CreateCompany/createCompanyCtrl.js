angular.module('starter')

.controller('createCompanyCtrl', function($ionicPopup ,$scope, $state, $stateParams,
  $rootScope, $ionicLoading, ionicMaterialInk, $timeout, $ionicPickerI18n,
  serviceCreateCompany, factoryCreateCompany, $cordovaCamera, serviceLogin,
  serviceLocation, $cordovaGeolocation) {

  $scope.getFoto = function (){
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
    correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // error
    });
  }

  $scope.getPhoto = function() {
    navigator.camera.getPicture(onSuccess, onFail, { quality: 75, targetWidth: 320,
    targetHeight: 320, destinationType: 0 });
    //destination type was a base64 encoding
    function onSuccess(imageData) {
        //preview image on img tag
        $('#image-preview').attr('src', "data:image/jpeg;base64,"+imageData);
        //setting scope.lastPhoto
        $scope.lastPhoto = dataURItoBlob("data:image/jpeg;base64,"+imageData);
    }
    function onFail(message) {
        alert('Failed because: ' + message);
    }
  }
  function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++)
    {
      ia[i] = byteString.charCodeAt(i);
    }

    var bb = new Blob([ab], { "type": mimeString });
    return bb;
  }


  $scope.createCompany = function(company) {
    company.latitude = $scope.position.lat;
    company.longitude = $scope.position.lng;
    $ionicLoading.show({
      template: 'Loading...'
    });
    $scope.user = serviceLogin.getUser();
    company.auth_token = $scope.user.auth_token;
    console.log(company);
    factoryCreateCompany.save(company, function(company) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Sucesso!',
        template: 'Empresa registrada!'
      });
      console.log(company);
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Cadastro falhou, verifique os dados'
      });
    });
  }

  $scope.company = serviceCreateCompany.getCompany();

  $cordovaGeolocation.getCurrentPosition()
    .then(function (position) {
      serviceLocation.setLocation(
        position.coords.latitude,
        position.coords.longitude
      );
      console.log(serviceLocation.getLocation());
    }, function(err) {
      // error
      console.log("Nao foi possivel localzar seu dispositivo!");
      console.log(err);
    });
    console.log(serviceLocation.getLocation());

  var mainMarker = {
    lat: 11,
    lng: 11,
    focus: true,
    message: "Hey, drag me if you want",
    draggable: true
  };
  var location = serviceLocation.getLocation();
  angular.extend($scope, {
    actual: {
      lat: location.latitude,
      lng: location.longitude,
      zoom: 8
    },
    markers: {
        mainMarker: angular.copy(mainMarker)
    },
    position: {
        lat: 51,
        lng: 0
    },
    events: { // or just {} //all events
        markers:{
          enable: [ 'dragend' ]
          //logic: 'emit'
        }
    }
  });

  $scope.$on("leafletDirectiveMarker.dragend", function(event, args){
    $scope.position.lat = args.model.lat;
    $scope.position.lng = args.model.lng;
  });
})
