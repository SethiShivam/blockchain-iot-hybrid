(function () {
    'use strict';
    angular.module('insuaranceApp').factory('insService', insService)
    insService.$inject = ['$http', '$q'];

    function insService($http, $q) {
        return {
            insAdminLogin: insAdminLogin
        }

        function insAdminLogin(url) {
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