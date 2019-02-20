(function () {
    'use strict';
    angular.module('insuaranceApp').factory('serviceCenterHomeService', serviceCenterHomeService)
    serviceCenterHomeService.$inject = ['$http', '$q'];

    function serviceCenterHomeService($http, $q) {
        return {
            workOrderList: workOrderList,
            completeOrder:completeOrder
        }

        function completeOrder(url){
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

        function workOrderList(url) {
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