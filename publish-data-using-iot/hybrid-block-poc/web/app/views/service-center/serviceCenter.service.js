(function () {
    'use strict';
    angular.module('insuaranceApp').factory('serviceCenterService', serviceCenterService)
    serviceCenterService.$inject = ['$http', '$q'];

    function serviceCenterService($http, $q) {
        return {
            serviceCenterAdminLogin: serviceCenterAdminLogin
        }

        function serviceCenterAdminLogin(url) {
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