(function () {
    'use strict';
    angular.module('insuaranceApp').factory('insuranceService', insuranceService)
    insuranceService.$inject = ['$http', '$q'];

	function insuranceService($http, $q) {
		 return {
            getPolicyLists: getPolicyLists,
            deActivatePolicy: deActivatePolicy,
            activatePolicy: activatePolicy,
            savePolicy: savePolicy,
            getConfirmedClaims: getConfirmedClaims,
            reimburseAmount: reimburseAmount,
            rejectClaim: rejectClaim,
            processForRepairing: processForRepairing
        }

        function processForRepairing(_url){
            var deferred = $q.defer();
            
            $http.get(_url, {
                headers: {
                    'Content-Type': 'application/json',
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

        function reimburseAmount(_url){
            var deferred = $q.defer();
            
            $http.get(_url, {
                headers: {
                    'Content-Type': 'application/json',
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

        function rejectClaim(_url){
            var deferred = $q.defer();
            
            $http.get(_url, {
                headers: {
                    'Content-Type': 'application/json',
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

        function getConfirmedClaims(_url){
            var deferred = $q.defer();
            
            $http.get(_url, {
                headers: {
                    'Content-Type': 'application/json',
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

        function savePolicy(_url){
            var deferred = $q.defer();
            
            $http.get(_url, {
                headers: {
                    'Content-Type': 'application/json',
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

        function getPolicyLists(_url) {
            var deferred = $q.defer();
            
            $http.get(_url, {
                headers: {
                    'Content-Type': 'application/json',
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

        function deActivatePolicy(_url) {
        	var deferred = $q.defer();
            
            $http.get(_url, {
                headers: {
                    'Content-Type': 'application/json',
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

        function activatePolicy(_url) {
        	var deferred = $q.defer();
            
            $http.get(_url, {
                headers: {
                    'Content-Type': 'application/json',
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