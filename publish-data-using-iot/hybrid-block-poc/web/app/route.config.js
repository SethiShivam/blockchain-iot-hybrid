(function () {
    'use strict';
    angular.module('insuaranceApp')
        .config(function ($routeProvider) {
            $routeProvider.
                when('/user', {
                    templateUrl: 'views/user.html',
                    controller: 'UserController'
                }).
                when('/userHome', {
                    templateUrl: 'views/user-home.html',
                    controller: 'UserHomeController'
                }).
                when('/insurance', {
                    templateUrl: 'views/insurance-company.html',
                    controller: 'InsuaranceCompanyController'
                }).
                when('/home', {
                    templateUrl: 'views/home.html',
                    controller: 'UserLoginController'
                }).
                when('/insAdminHome', {
                    templateUrl: 'views/ins.html',
                    controller: 'InsController'
                }). // service center
                when('/serviceCenter', {
                    templateUrl: 'views/service-center.html',
                    controller: 'ServiceCenterController'
                }).
                when('/serviceCenterHome', {
                    templateUrl: 'views/service-center-home.html',
                    controller: 'ServiceCenterHomeController'
                }). // police
                when('/police', {
                    templateUrl: 'views/police.html',
                    controller: 'PoliceController'
                }).
                when('/policeHome', {
                    templateUrl: 'views/police-home.html',
                    controller: 'PoliceHomeController'
                }).
                otherwise({
                    redirectTo: '/user'
                });
        });
})();