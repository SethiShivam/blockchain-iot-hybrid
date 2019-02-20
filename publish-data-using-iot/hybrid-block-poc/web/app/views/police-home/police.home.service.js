(function () {
    'use strict';
    angular.module('insuaranceApp').factory('policeHomeService', policeHomeService)
    policeHomeService.$inject = ['$http', '$q'];

    function policeHomeService($http, $q) {
        return {
            getRequestedNewClaims: getRequestedNewClaims,
            rejectClaimRequest: rejectClaimRequest,
            confirmClaimRequest: confirmClaimRequest,
            uploadFile: uploadFile
        }

        function uploadFile(url, fd){
            var deferred = $q.defer();

            $http.post(url, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(response){
                deferred.resolve(response);
            })
            .error(function(errResponse){
                console.error('Error while get request');
                deferred.reject(errResponse);
            });

            return deferred.promise;
        }

        function getRequestedNewClaims(url) {
            var deferred = $q.defer();
            $http.get(url,{
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

        function rejectClaimRequest(url){
            var deferred = $q.defer();
            $http.get(url,{
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

        function confirmClaimRequest(url){
            var deferred = $q.defer();
            $http.get(url,{
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