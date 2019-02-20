(function () {
    'use strict';
    angular.module('insuaranceApp').factory('policeService', policeService)
    policeService.$inject = ['$http', '$q'];

    function policeService($http, $q) {
        return {
            policeAdminLogin: policeAdminLogin
        }

        function policeAdminLogin(url) {
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