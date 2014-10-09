var forrestApp = angular.module( 'forrestApp', [ 'ngCordova','ngTouch', 'ngAnimate', 'ngRoute' , 'ngResource', 'ui.bootstrap'] );

forrestApp.config(function( $routeProvider ) {
    $routeProvider
	// home page
	.when('/', {
		templateUrl: 'views/home.html',
        controller: 'mainController'
	})
	// gallery page
	.when('/gallery', {
		templateUrl: 'views/gallery.html',
        controller: 'galleryController'
	})
    // gallery page
    .when('/detailParque', {
        templateUrl: 'views/detailParque.html',
        controller: 'detailController'
    })
    //mapa
    .when('/detailparqueMap', {
        templateUrl: 'views/detailParqueMap.html',
        controller: 'detailParqueMapController'
    })
    //detailparqueDatosGen
    .when('/detailparqueDatosGen', {
        templateUrl: 'views/detailParqueDatosGen.html',
        controller: 'detailparqueDatosGenController'
    })
      //detailparqueServices
    .when('/detailparqueServices', {
        templateUrl: 'views/services.html',
        controller: 'detailparqueServicesController'
    })
    //detailparqueEcoturismosController
    .when('/detailparqueEco', {
        templateUrl: 'views/ecoturismo.html',
        controller: 'detailparqueEcoturismosController'
    })
    //misfotos
    .when('/misfotos', {
        templateUrl: 'views/misfotos.html',
        controller: 'misfotosController'
    })
    // gallery page
    .when('/galeria', {
        templateUrl: 'views/galeria.html',
        controller: 'galeriaController'
    })
    //misfotos
    .when('/misfotos', {
        templateUrl: 'views/misfotos.html',
        controller: 'misfotosController'
    })
    //misfotos
    .when('/takephoto', {
        templateUrl: 'views/takePhoto.html',
        controller: 'takephotoController'
    })
});


forrestApp.run(function ($rootScope, $location) {
    var history = [];
    $rootScope.$on('$routeChangeSuccess', function() {
        history.push($location.$$path);
    });
    $rootScope.back = function () {
        var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
        $location.path(prevUrl);
    };
});
// CONTROLLERS ============================================
// home page controller
forrestApp.controller('mainController', function( $scope,$http ,$location,$rootScope) {
    $scope.pageClass = 'page-home';
    $scope.isLeftBarHidden = false;
    this.animateLeftBar = function() { $scope.isHidden = !$scope.isHidden;    }
    this.animateRightBar = function() { $scope.isHiddenR = !$scope.isHiddenR;    }

    $http.get('regiones.json').success (function(data){
        $scope.regiones = data;
    });

    this.goNext = function ( hash ) { $location.path(hash); }
    this.GotoGallery = function ( Region ){
        $rootScope.NameRegionCurrent = Region;
        this.goNext("gallery");
    }
});
// about page controller
forrestApp.controller('galleryController', function($scope,$http,$location,$rootScope) {
    $scope.pageClass = 'page-gallery';
    $scope.isLeftBarHidden = false;
    this.animateLeftBar = function() { $scope.isHidden = !$scope.isHidden; }
    this.animateRightBar = function() { $scope.isHiddenR = !$scope.isHiddenR; }

    $http.get('parques.json').success (function(data){
        $scope.parques = data;
    });
    this.goNext = function ( hash ) { $location.path(hash); }
    this.goBack = function ( ){
        this.goNext("");
    }
    this.GotoDetailsParque = function ( parqueNameId ){
        $rootScope.parqueId = parqueNameId;
        this.goNext("detailParque");
    }
});

// detail page controller
forrestApp.controller('detailController', function($scope,$http,$location,$rootScope) {
    $scope.pageClass = 'page-detailparque';    
    this.animateLeftBar = function() { 
        $scope.isHidden = !$scope.isHidden; 
        $scope.isHiddenR == false;
    }
    this.animateRightBar = function() { 
        $scope.isHiddenR = !$scope.isHiddenR; 
        $scope.isHidden == false;
    }
    this.goNext = function ( hash ) { $location.path(hash); }
    //TODO -- VERY IMPORTANT
    //ACA VOY A USAR EL PARQUEID DEL ROOTSCOPE PARA IR POR LA DATA CORRESPONDIENTE USANDO EL ID DEL PARQUE
    $http.get('parqueinfo.json').success (function(data){
        $rootScope.parqueNameDetail  = data.parque;
        $rootScope.parqueDetailImage = data.mainImage;
        $rootScope.parqueDetailEco   = data.ecosystemas;
        $rootScope.parqueDetailFlora = data.flora;
        $rootScope.parqueDetailFauna = data.fauna;
        $rootScope.parqueDetailMap   = data.map;

        $rootScope.parqueDetaildateCreation  = data.dateCreation;
        $rootScope.parqueDetailextention     = data.extention;
        $rootScope.parqueDetailtemperature   = data.temperature;
        $rootScope.parqueDetailbaseHeight    = data.baseHeight;

        $rootScope.parqueDetailparkValue     = data.parkValue;
        $rootScope.parqueDetailgetThere      = data.getThere;

        $rootScope.parqueDetailroads         = data.roads;
        $rootScope.parqueDetailbirds         = data.birds;
        $rootScope.parqueDetailcamping       = data.camping;
    });
});
// galeria page controller
forrestApp.controller('galeriaController', function($scope,$http) {
    $scope.pageClass = 'page-galeria';
    $scope.zoomImg = false;
    $scope.largeImg = "";
    $scope.swipeDir = false;
    
    this.animateLeftBar = function() { $scope.isHidden = !$scope.isHidden; }
    this.animateRightBar = function() { $scope.isHiddenR = !$scope.isHiddenR; }

    this.setLargImg = function (largImg) {
        $scope.largeImg = largImg;
                $scope.zoomImg = true;
                console.log("open"+largImg);

    }
    this.closeLargeImg = function () {
        $scope.largeImg = "";
        $scope.zoomImg = false;

    }
    this.MoveLeft = function(){
        console.log("left");
        $scope.swipeDir =true  ;   
    }

    $http.get(' galeria.json' ).success (function(data){
        $scope.galerias = data;
    });
});
//misfotosController
forrestApp.controller('misfotosController', function( $scope,$http,$cordovaFile ,$cordovaCamera) {
    $scope.pageClass = 'page-misfotos';
    $scope.pictureSource;   // picture source

    this.animateLeftBar = function() { $scope.isHidden = !$scope.isHidden; }
    this.searchFiles = function() {

        $cordovaFile.checkDir(Camera.PictureSourceType.PHOTOLIBRARY).then(function(result) {
              // Success! 
              $scope.pictureSource=result;
          }, function(err) {
              // An error occured. Show a message to the user
            $scope.pictureSource="errrr";
          });
    }
    $http.get( 'misfotos.json' ).success (function( data ){
        $scope.misFotos = data;
    });
});
//detailParqueMapController
forrestApp.controller('detailParqueMapController', function($scope,$http) {
    $scope.pageClass = 'page-detailparqueMap';
    $scope.isLeftBarHidden = false;
    
    this.animateLeftBar = function() { $scope.isHidden = !$scope.isHidden; }
    this.animateRightBar = function() { $scope.isHiddenR = !$scope.isHiddenR; }
    
});
//detailparqueServicesController
forrestApp.controller('detailparqueServicesController', function($scope,$http) {
    $scope.pageClass = 'page-detailparqueServices';
    $scope.isLeftBarHidden = false;
    
    this.animateLeftBar = function() { $scope.isHidden = !$scope.isHidden; }
    this.animateRightBar = function() { $scope.isHiddenR = !$scope.isHiddenR; }
    
});
//detailparqueDatosGenController
forrestApp.controller('detailparqueDatosGenController', function($scope,$http) {
    $scope.pageClass = 'page-detailparqueDatosGen';
    $scope.isLeftBarHidden = false;
    
    this.animateLeftBar = function() { $scope.isHidden = !$scope.isHidden; }
    this.animateRightBar = function() { $scope.isHiddenR = !$scope.isHiddenR; }
    
});
//detailparqueDatosGenController
forrestApp.controller('detailparqueEcoturismosController', function($scope,$http) {
    $scope.pageClass = 'page-detailparqueDatosGen';
    $scope.isLeftBarHidden = false;
    
    this.animateLeftBar = function() { $scope.isHidden = !$scope.isHidden; }
    this.animateRightBar = function() { $scope.isHiddenR = !$scope.isHiddenR; }
    
});
//takephotoController
forrestApp.controller('takephotoController', function( $scope,$http,$cordovaCamera ) {
    $scope.pageClass = 'page-takephoto';
    $scope.isLeftBarHidden = false;
    
    this.animateLeftBar = function() { $scope.isHidden = !$scope.isHidden; }
    
    this.takePicture = function(){   
        var cameraOptions = {
            quality: 50,
            //sourceType:Camera.PictureSourceType.PHOTOLIBRARY ,
            destinationType: Camera.DestinationType.DATA_URL ,
            popoverOptions: CameraPopoverOptions ,
            saveToPhotoAlbum: true   
         };
        var success = function( data ){ $scope.$apply(function () { $scope.cameraPic = "data:image/jpeg;base64," + data;}); };
        var failure = function( message ){ alert('Failed because: ' + message); };
        //call the cordova camera plugin to open the device's camera
        navigator.camera.getPicture( success , failure , cameraOptions );            
    };
});

