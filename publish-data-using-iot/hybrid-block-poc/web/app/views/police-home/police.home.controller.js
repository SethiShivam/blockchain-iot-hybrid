(function () {
    'use strict';
    
    angular.module('insuaranceApp').controller('PoliceHomeController', PoliceHomeController)

    PoliceHomeController.$inject = ['$scope', 'policeHomeService','toastr','$state','$rootScope','$http'];

    function PoliceHomeController($scope, policeHomeService, toastr, $state, $rootScope, $http) {
    	var vm = this;
    	vm.confirmClaimView = false;
    	vm.getRequestedNewClaims = getRequestedNewClaims;
    	vm.viewClaimRequest = viewClaimRequest;
    	vm.rejectClaimRequest = rejectClaimRequest;
    	vm.confirmClaimRequest = confirmClaimRequest;
        vm.fileError = false;
    	// default call
    	_init();

        function _init() {

        	// is user loggedIn
			// if($rootScope.userEmail === undefined) {
            	// $state.go("app.user");
            // }

            getRequestedNewClaims();

            // vm.isSignIn = true;
        }

        function getRequestedNewClaims(){
        	var url = 'http://localhost:8000/api/police/theftClaimList';

            policeHomeService.getRequestedNewClaims(url)
                .then(function (response) {
                    vm.requestedNewClaims = angular.fromJson(response.data);
                    console.log('Requested Claims : ', response.data);
                }, function (error) {
                    console.log(error);
            });
        }

        function viewClaimRequest(claimDetails){
        	vm.confirmClaimView = true;

        	vm.requesterName = claimDetails.name;
        	vm.requesterReason = claimDetails.description;
        	vm.fileclaimuuid = claimDetails.uuid;
        	vm.contractuuid =claimDetails.contract_uuid;
        }

        function confirmClaimRequest(isValid, confirmationDetails, fileclaimuuId, contractuuId) {
        	//console.log(isValid);
        	//console.log(confirmationDetails);
        	//console.log(fileclaimuuId);

        	vm.fileError = false;

            if( confirmationDetails == undefined) {
                vm.fileError = true;
                return;
            }

            var file = confirmationDetails.myFile;
            console.dir(file);
            
            var formData = new FormData();
            formData.append('fir', file);     	

        	if(confirmationDetails.isTheft == undefined) {
        		confirmationDetails.isTheft = false;
        	}

        	var url = 'http://localhost:8000/api/police/approveClaim/fileclaimuuid/'+fileclaimuuId+'/contractuuid/'+contractuuId+'/isTheft/'+confirmationDetails.isTheft;

        	if(isValid) {
        		policeHomeService.uploadFile(url, formData)
                .then(function (response) {
                    // vm.requestedNewClaims = angular.fromJson(response.data);
                    console.log(response);
                    toastr.success(response.data,'Claim is confirmed successfully.');
                    vm.confirmClaimView = false;
                    getRequestedNewClaims();

                }, function (error) {
                    console.log(error);
            	});
        	}

        }

        function rejectClaimRequest(claimDetails){
        	console.log(claimDetails);

        	var url = 'http://localhost:8000/api/police/rejectClaim/fileclaimuuid/'+claimDetails.uuid+'/contractuuid/'+claimDetails.contract_uuid;

        	policeHomeService.rejectClaimRequest(url)
                .then(function (response) {
                    console.log('Requested Claims : ', response.data);
                    getRequestedNewClaims();
                    toastr.success(response.data,'Claim is rejected successfully.');

                }, function (error) {
                    console.log(error);
            });
        }

    }

    angular.module('insuaranceApp').directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
    }]);


})();    