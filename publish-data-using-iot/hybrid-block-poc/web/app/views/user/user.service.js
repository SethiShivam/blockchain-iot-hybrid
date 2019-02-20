(function () {
    'use strict';
    angular.module('insuaranceApp').factory('userService', userService)
    userService.$inject = ['$http', '$q'];

    function userService($http, $q) {
        return {
            saveUser: saveUser,
            getUserList: getUserList,
            userLogin: userLogin
        }

        function userLogin(url) {
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

        function saveUser(url) {
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

        function getUserList(url, token) {
            var deferred = $q.defer();
            $http.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": 'Bearer ' + token
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