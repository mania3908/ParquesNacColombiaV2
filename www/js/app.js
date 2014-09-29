var forrestApp = angular.module( 'forrestApp', [ 'ngTouch', 'ngAnimate', 'ngRoute' , 'ngResource' ,'ui.bootstrap'] );

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
});
// CONTROLLERS ============================================
// home page controller
forrestApp.controller('mainController', function( $scope,$http ) {
    $scope.pageClass = 'page-home';
    $scope.isLeftBarHidden = false;
    
    this.animateLeftBar = function() { $scope.isHidden = !$scope.isHidden;    }
    this.animateRightBar = function() { $scope.isHiddenR = !$scope.isHiddenR;    }

    $http.get('regiones.json').success (function(data){
            $scope.regiones = data;
    });
});
// about page controller
forrestApp.controller('galleryController', function($scope,$http) {
    $scope.pageClass = 'page-gallery';
    $scope.isLeftBarHidden = false;
    
    this.animateLeftBar = function() { $scope.isHidden = !$scope.isHidden; }
    this.animateRightBar = function() { $scope.isHiddenR = !$scope.isHiddenR; }

    $http.get('parques.json').success (function(data){
            $scope.parques = data;
    });
});

// detail page controller
forrestApp.controller('detailController', function($scope,$http) {
    $scope.pageClass = 'page-detailparque';    
    this.animateLeftBar = function() { 
        $scope.isHidden = !$scope.isHidden; 
        $scope.isHiddenR == false;
    }
    this.animateRightBar = function() { 
        $scope.isHiddenR = !$scope.isHiddenR; 
        $scope.isHidden == false;
        console.log("right");
    }

    $http.get('parqueinfo.json').success (function(data){
        $scope.parqueNmaeDetail = data;
    });
});

// galeria page controller
forrestApp.controller('galeriaController', function($scope,$http) {
    $scope.pageClass = 'page-galeria';
    
    this.animateLeftBar = function() { $scope.isHidden = !$scope.isHidden; }
    this.animateRightBar = function() { $scope.isHiddenR = !$scope.isHiddenR; }

    $http.get('galeria.json').success (function(data){
        $scope.galerias = data;
        console.log(data);
    });
});

//misfotosController
forrestApp.controller('misfotosController', function($scope,$http) {
    $scope.pageClass = 'page-misfotos';
    this.animateLeftBar = function() { $scope.isHidden = !$scope.isHidden; }

    $http.get('misfotos.json').success (function(data){
        $scope.misFotos = data;
      //  console.log(data);
    });
});

//misfotosController
forrestApp.controller('detailParqueMapController', function($scope,$http) {
    $scope.pageClass = 'page-detailparqueMap';
    $scope.isLeftBarHidden = false;
    
    this.animateLeftBar = function() { $scope.isHidden = !$scope.isHidden; }
    this.animateRightBar = function() { $scope.isHiddenR = !$scope.isHiddenR; }
});


