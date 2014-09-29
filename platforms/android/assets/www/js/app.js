var forrestApp = angular.module( 'forrestApp', [ 'ngTouch', 'ngAnimate', 'ngRoute' , 'ngResource' ,'ui.bootstrap'] );
// ROUTING ===============================================
// set our routing for this application
// each route will pull in a different controller

//$scope.regiones = [];

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
    
    this.animateLeftBar = function() {
        $scope.isHidden = !$scope.isHidden;
        console.log("|_______"+$scope.isHidden);
    }
    this.animateRightBar = function() {
        $scope.isHiddenR = !$scope.isHiddenR;
        console.log("|_______"+$scope.isHiddenR);
    }
    $http.get('regiones.json').success (function(data){
            console.log(data);
            $scope.regiones = data;
    });
});
// about page controller
forrestApp.controller('galleryController', function($scope,$http) {
    $scope.pageClass = 'page-gallery';
    $scope.isLeftBarHidden = false;
    
    this.animateLeftBar = function() { $scope.isHidden = !$scope.isHidden;    }
    this.animateRightBar = function() {
        $scope.isHiddenR = !$scope.isHiddenR;
        console.log("|_______"+$scope.isHiddenR);
    }

    $http.get('parques.json').success (function(data){
            //$scope.guitarVariable = data;
            console.log(data);
            $scope.parques = data;
    });
});

// detail page controller
forrestApp.controller('detailController', function($scope,$http) {
    $scope.pageClass = 'page-detailparque';
    $scope.isLeftBarHidden = false;
    
    this.animateLeftBar = function() { $scope.isHidden = !$scope.isHidden; }
    this.animateRightBar = function() {
        $scope.isHiddenR = !$scope.isHiddenR;
        console.log("|_______"+$scope.isHiddenR);
    }

    $http.get('parqueinfo.json').success (function(data){
            console.dir("___111____"+data);
            $scope.parqueNmaeDetail = data;
    });
});


// galeria page controller
forrestApp.controller('galeriaController', function($scope,$http) {
    $scope.pageClass = 'page-galeria';
    $scope.isLeftBarHidden = false;
    
    
});

//misfotosController
// galeria page controller
forrestApp.controller('misfotosController', function($scope,$http) {
    $scope.pageClass = 'page-misfotos';
    $scope.isLeftBarHidden = false;
    
    
});


