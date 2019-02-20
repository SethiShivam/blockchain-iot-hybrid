(function () {
    'use strict';
    
    angular.module('insuaranceApp').controller('UserController', UserController)

    UserController.$inject = ['$scope', 'userService','toastr','$state','$rootScope'];

    function UserController($scope, userService, toastr, $state, $rootScope) {
        var vm = this;
        vm.saveUser = saveUser;
        vm.userLogin = userLogin;
        vm.policyRequest = policyRequest;
        
        function saveUser(frmUser, userData) {

            if (frmUser.$valid) {
                console.log(userData);

            var url = '/api/user/registerUser/username/'+userData.email+'/password/'+userData.password+'/first_name/'+userData.firstName+'/last_name/'+userData.lastName;
            
            userService.saveUser(url)
                .then(function (response) {
                    console.log(response);

                    if(response.status === 200 ) {
                        toastr.success(response.data,'Registration completed.');
                        
                        // Reset fields
                        userData.email = '';
                        userData.password = '';
                        userData.firstName = '';
                        userData.lastName = '';
                        userData.confirmPassword = '';
                        
                        frmUser.$setPristine();
                    }
                }, function (error) {
                    console.log(error);
                });

            }
        }

        function userLogin(isValid, loginData) {
            if (isValid) {
                console.log(loginData);

                var url = '/api/user/authentication/username/'+loginData.email+'/password/'+loginData.pwd;
            
                userService.userLogin(url)
                .then(function (response) {
                    console.log(response);

                    if(response.status === 200 ) {

                        if(response.data) {
                            toastr.success(response.data,'Login successfully');

                            // set root variable
                            $rootScope.userEmail = loginData.email;

                            $state.go("app.userHome");
                        } else {
                            toastr.error(response.data,'User authentication fail');
                        }

                    }

                }, function (error) {
                    console.log(error);
                });

            }
        }

        function getUserList(token) {
            var url = 'http://localhost:4000/channels/mychannel/chaincodes/mycc?peer=peer1&fcn=qRetrieveAllUsers&args=%5B%222017%22%5D';

            userService.getUserList(url, token)
                .then(function (response) {
                    vm.userList = angular.fromJson(response.data.data);
                    console.log('Get All Users', response);
                }, function (error) {
                    console.log(error);
                });
        }

        function policyRequest(isValid, policyData) {
            if (isValid) {
                console.log(policyData);
            }
        }
    }
})();

