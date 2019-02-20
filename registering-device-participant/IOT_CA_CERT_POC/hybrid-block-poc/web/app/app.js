(function () {
    'use strict';
    angular.module('insuaranceApp', ['ui.router','toastr'])
        .config(routes)

    function routes($urlRouterProvider, $stateProvider, $httpProvider) {
       
        // $httpProvider.interceptors.push('httpInterceptor');
        $urlRouterProvider.otherwise('/user');

        var appState = {
            abstract: true,
            name: 'app',
            url: '',
            views: {
                "": { template: '<ui-view></ui-view>' },
                'header': { templateUrl: 'views/layouts/header.html' },
                'footer': { templateUrl: 'views/layouts/footer.html' }
            }
        }

        var userState = {
            name: 'app.user',
            url: '/user',
            templateUrl: 'views/user/user.html',
            controller: 'UserController',
            controllerAs: 'vm',
        }

        var userHome = {
            name: 'app.userHome',
            url: '/user-home',
            templateUrl: 'views/user-home/userHome.html',
            controller: 'UserHomeController',
            controllerAs: 'vm',
        }

        var insuranceState = {
            name: 'app.insurance',
            url: '/insurance',
            templateUrl: 'views/insurance/insuranceCompany.html',
            controller: 'InsuaranceCompanyController',
            controllerAs: 'vm',
        }

        //
        var userLoginState = {
            name: 'app.home',
            url: '/home',
            templateUrl: 'views/home/login.user.html',
            controller: 'UserLoginController',
            controllerAs: 'vm',
        }

        var insAdminLoginState = {
            name: 'app.insHome',
            url: '/ins-admin-home',
            templateUrl: 'views/ins/ins.html',
            controller: 'InsController',
            controllerAs: 'vm',            
        }

        // police
        var policeState = {
            name: 'app.police',
            url: '/police',
            templateUrl: 'views/police/police.html',
            controller: 'PoliceController',
            controllerAs: 'vm',            
        }
        var policeHomeState = {
            name: 'app.policeHome',
            url: '/police-home',
            templateUrl: 'views/police-home/police.home.html',
            controller: 'PoliceHomeController',
            controllerAs: 'vm',            
        }

        // service center
        var serviceCenterState = {
            name: 'app.servicerCenter',
            url: '/service-center',
            templateUrl: 'views/service-center/serviceCenter.html',
            controller: 'ServiceCenterController',
            controllerAs: 'vm',
        }

        var serviceCenterHomeState = {
            name: 'app.serviceCenterHome',
            url: '/service-center-home',
            templateUrl: 'views/service-center-home/service.center.home.html',
            controller: 'ServiceCenterHomeController',
            controllerAs: 'vm',            
        }

        $stateProvider.state(appState);
        $stateProvider.state(userState);
        $stateProvider.state(userHome);
        $stateProvider.state(insuranceState);
        
        //
        $stateProvider.state(userLoginState);
        $stateProvider.state(insAdminLoginState);
        
        //
        $stateProvider.state(serviceCenterState);
        $stateProvider.state(serviceCenterHomeState);
        
        //
        $stateProvider.state(policeState);
        $stateProvider.state(policeHomeState);
    }

})();


