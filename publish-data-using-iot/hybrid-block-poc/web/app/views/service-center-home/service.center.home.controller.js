(function () {
    'use strict';
    
    angular.module('insuaranceApp').controller('ServiceCenterHomeController', ServiceCenterHomeController)

    ServiceCenterHomeController.$inject = ['$scope', 'serviceCenterHomeService','toastr','$state','$rootScope'];

    function ServiceCenterHomeController($scope, serviceCenterHomeService, toastr, $state, $rootScope) {
    	var vm = this;
    	vm.completeOrder = completeOrder;
    	// function implementations
        _init();

        function _init() {

        	// is user loggedIn
			// if($rootScope.userEmail === undefined) {
            	// $state.go("app.user");
            // }

            getWorkOrders();

            // vm.isSignIn = true;
        }

        function getWorkOrders() {
        	var url = '/api/service/repairOrderLists';
        	
        	serviceCenterHomeService.workOrderList(url)
                .then(function (response) {
                    vm.workOrders = angular.fromJson(response.data);
                    
            }, function (error) {
                console.log(error);
            });
               
        }

        function completeOrder(orderDetails){
            var url = '/api/service/completeWorkOrder/fileclaimuuid/'+orderDetails.claim_uuid;
            
            serviceCenterHomeService.completeOrder(url)
                .then(function (response) {
                    // vm.workOrders = angular.fromJson(response.data);
                    // console.log('Work orders : ', response.data);
                    if(response.status === 200 ) {
                       toastr.success(response.data,'Repairing order completed.');
                       getWorkOrders()
                    }

            }, function (error) {
                console.log(error);
            });
        }

    }

})();    