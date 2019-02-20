(function () {
    'use strict';
    
    angular.module('insuaranceApp').controller('PoliceController', PoliceController)

    PoliceController.$inject = ['$scope', 'policeService','toastr','$state','$rootScope'];

    function PoliceController($scope, policeService, toastr, $state, $rootScope) {
    	var vm = this;
        vm.policeAdminLogin = policeAdminLogin;

        function policeAdminLogin(isValid, loginData) {
            console.log(loginData);
            console.log(isValid);

            if (isValid) {
                console.log(loginData);

                var url = '/api/police/authentication/username/'+loginData.email+'/password/'+loginData.pwd;

                policeService.policeAdminLogin(url)
                .then(function (response) {

                    console.log(response);

                    if(response.status === 200 ) {

                        if(response.data) {
                            toastr.success(response.data,'Login successfully');

                            // set root variable
                            // $rootScope.userEmail = loginData.email;

                            $state.go("app.policeHome");
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
