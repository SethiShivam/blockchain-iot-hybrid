(function () {
    'use strict';
    angular.module('insuaranceApp').factory('userHomeService', userHomeService)
    userHomeService.$inject = ['$http', '$q'];

    function userHomeService($http, $q){
    	return {
            getActivePolicy: getActivePolicy,
            buyPolicy: buyPolicy,
            userContracts: userContracts,
            viewClaims: viewClaims,
            fileClaim: fileClaim
        }

        function viewClaims(url){
            var deferred = $q.defer();
            $http.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                deferred.resolve(response);
            },
                function (errResponse) {
                    console.error('Error while get request');
                    deferred.reject(errResponse);
                });
            return deferred.promise;
        }

        function fileClaim(url){
            var deferred = $q.defer();
            $http.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                deferred.resolve(response);
            },
                function (errResponse) {
                    console.error('Error while get request');
                    deferred.reject(errResponse);
                });
            return deferred.promise;
        }

        function getActivePolicy(url) {
        	var deferred = $q.defer();
            $http.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                deferred.resolve(response);
            },
                function (errResponse) {
                    console.error('Error while get request');
                    deferred.reject(errResponse);
                });
            return deferred.promise;
        }

        function buyPolicy(url) {
            var deferred = $q.defer();
            $http.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                deferred.resolve(response);
            },
                function (errResponse) {
                    console.error('Error while get request');
                    deferred.reject(errResponse);
                });
            return deferred.promise;
        }

        function userContracts(url) {
            var deferred = $q.defer();
            $http.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                deferred.resolve(response);
            },
                function (errResponse) {
                    console.error('Error while get request');
                    deferred.reject(errResponse);
                });
            return deferred.promise;
        }
    }

})();    