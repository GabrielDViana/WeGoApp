angular.module('starter')

.controller('createCompanyCtrl', function($ionicPopup ,$scope, $state, $stateParams,
  $rootScope, $ionicLoading, ionicMaterialInk, $timeout, $ionicPickerI18n,
  serviceCreateCompany, factoryCreateCompany, $cordovaCamera, $cordovaImagePicker,
  serviceLogin, NgMap, serviceLocation, $filter, $compile, factoryGetCategories) {

    $scope.getCategories = function(){
      factoryGetCategories.get(function(categories) {
        $ionicLoading.hide();
        $rootScope.categories = categories;
        console.log($rootScope.categories);
        $ionicLoading.hide();
      }, function(error) {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Erro!',
          template: 'Não foi possivel \nacessar o banco de dados'
        });
        $state.go('app.profile');
      })
    }
  //   $scope.groupData =[
  //   {name: "Group1",
  //    sub: [{name: 'Subgroup1'}]
  //   },
  //   {name: "Group2", sub: [{name: 'Subgroup2'}, {name: 'Subgroup22'}, ]},
  //                          {name: "Group3", sub: [{name: 'Subgroup3'}]}
  // ];

  $rootScope.subcategories = [];
  $scope.update = function(groupSelected) {
    angular.forEach($rootScope.categories, function (groupVal) {
        if (groupVal.name == groupSelected) {
          $rootScope.subcategories = groupVal.subcategories;
          console.log($rootScope.subcategories);
    }
      });
  };
    // $scope.initialize = function() {
    //   var myLatlng = new google.maps.LatLng(43.07493,-89.381388);
    //
    //   var mapOptions = {
    //     center: myLatlng,
    //     zoom: 15,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   };
    //   var map = new google.maps.Map(document.getElementById("map"),
    //       mapOptions);
    //
    //   //Marker + infowindow + angularjs compiled ng-click
    //   var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
    //   var compiled = $compile(contentString)($scope);
    //
    //   var infowindow = new google.maps.InfoWindow({
    //     content: compiled[0]
    //   });
    //
    //   $scope.marker = new google.maps.Marker({
    //     position: myLatlng,
    //     map: map,
    //     title: 'Uluru (Ayers Rock)'
    //   });
    //
    //   google.maps.event.addListener($scope.marker, 'click', function() {
    //     infowindow.open(map,$scope.marker);
    //   });
    //
    //   $scope.map = map;
    // }
    // google.maps.event.addDomListener(window, 'load', $scope.initialize);


  $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAPfi0mlLEsRQf96-64bONF7DoLxYtLwRY";

  $scope.marker;
  var vm = this;
  NgMap.getMap().then(function(map) {
    vm.map = map;
    $scope.marker = map.markers[0];
    console.log('latitude',$scope.marker.position.lat());
    console.log('longitude',$scope.marker.position.lng());
  });
  vm.click = function(event) {
    vm.map.setCenter($scope.marker.getPosition());
    console.log('latitude',$scope.marker.position.lat());
    console.log('longitude',$scope.marker.position.lng());
    console.log($scope.marker);
  };
    $scope.images = [];
    $scope.imagens = [];
    $scope.selImages = function() {
       var options = {
         maximumImagesCount: 10,
         width: 800,
         height: 800,
         quality: 80
       };

       $cordovaImagePicker.getPictures(options)
         .then(function (results) {
             for (var i = 0; i < results.length; i++) {
                //  console.log('Image URI: ' + results[i]);
                 $scope.imagens.push(results[i]);
                // Encode URI to Base64
                window.plugins.Base64.encodeFile(results[i], function(base64){
                   // Save images in Base64
                   $scope.images.push(base64);
                   $scope.imag = $scope.images[0];
                });

             }
             if(!$scope.$$phase) {
               $scope.$apply();
             }

         }, function(error) {
             // error getting photos
         });
         console.log("Base64:\n\n\n",$scope.images);

     };
     $scope.logi = function () {
       alert($scope.images);
     }


  $scope.today = new Date();
  $scope.filtered = $filter('date')($scope.today, 'EEEE');

  $scope.days = [
    {id: 'Sunday', text: 'Domingo'},
    {id: 'Monday', text: 'Segunda'},
    {id: 'Tuesday', text: 'Terça'},
    {id: 'Wednesday', text: 'Quarta'},
    {id: 'Thursday', text: 'Quinta'},
    {id: 'Friday', text: 'Sexta'},
    {id: 'Saturday', text: 'Sábado'}
  ];
  $scope.company = {
    days: {}
  };
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
    company.time_opens = $filter('date')(company.time_opens, 'HH:mm');
    company.time_closes = $filter('date')(company.time_closes, 'HH:mm');
    company.latitude = $scope.marker.position.lat();
    company.longitude =$scope.marker.position.lng();
    company.company_images = $scope.images;
    $ionicLoading.show({
      template: 'Loading...'
    });
    $scope.user = serviceLogin.getUser();
    company.auth_token = $scope.user.auth_token;
    console.log("BF create",company);
    factoryCreateCompany.save(company, function(company) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Sucesso!',
        template: 'Empresa registrada!'
      });
      $state.go('app.profile');
      console.log(company);
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Cadastro falhou, verifique os dados'
      });
    });
  }

})
