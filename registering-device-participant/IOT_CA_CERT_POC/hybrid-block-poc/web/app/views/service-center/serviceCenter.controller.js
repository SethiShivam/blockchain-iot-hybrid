(function () {
    'use strict';
    
    angular.module('insuaranceApp').controller('ServiceCenterController', ServiceCenterController)

    ServiceCenterController.$inject = ['$scope', 'serviceCenterService','toastr','$state','$rootScope'];

    function ServiceCenterController($scope, serviceCenterService, toastr, $state, $rootScope) {
    	var vm = this;
        vm.serviceCenterAdminLogin = serviceCenterAdminLogin;

        function serviceCenterAdminLogin(isValid, loginData) {
            console.log(loginData);
            console.log(isValid);

            if (isValid) {
                console.log(loginData);

                var url = '/api/service/authentication/username/'+loginData.email+'/password/'+loginData.pwd;

                serviceCenterService.serviceCenterAdminLogin(url)
                .then(function (response) {

                    console.log(response);

                    if(response.status === 200 ) {

                        if(response.data) {
                            toastr.success(response.data,'Login successfully');

                            // set root variable
                            // $rootScope.userEmail = loginData.email;

                            $state.go("app.serviceCenterHome");
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
