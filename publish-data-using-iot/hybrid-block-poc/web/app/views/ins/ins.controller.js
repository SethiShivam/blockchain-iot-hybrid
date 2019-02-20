(function () {
    'use strict';
    
    angular.module('insuaranceApp').controller('InsController', InsController)

    InsController.$inject = ['$scope', 'insService','toastr','$state','$rootScope'];

    function InsController($scope, insService, toastr, $state, $rootScope) {
    	var vm = this;
        vm.insAdminLogin = insAdminLogin;

        function insAdminLogin(isValid, loginData) {
            console.log(loginData);
            console.log(isValid);

            if (isValid) {
                console.log(loginData);

                var url = '/api/insurance/authentication/username/'+loginData.email+'/password/'+loginData.pwd;

                insService.insAdminLogin(url)
                .then(function (response) {

                    console.log(response);

                    if(response.status === 200 ) {

                        if(response.data) {
                            toastr.success(response.data,'Login successfully');

                            // set root variable
                            // $rootScope.userEmail = loginData.email;

                            $state.go("app.insurance");
                        } else {
                            toastr.error(response.data,'User authentication fail');
                        }

                    }

                }, function (error) {
                    console.log(error);
                });

            }
        }
	}
	
})();
