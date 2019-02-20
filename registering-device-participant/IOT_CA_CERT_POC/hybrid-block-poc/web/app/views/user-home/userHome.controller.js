(function () {
    'use strict';
    angular.module('insuaranceApp').controller('UserHomeController', UserHomeController)
    UserHomeController.$inject = ['$scope', 'userHomeService','toastr','$rootScope', '$state'];

    function UserHomeController($scope, userHomeService, toastr, $rootScope, $state) {
        var vm = this;

        // functions index
        vm.getActivePolicy = getActivePolicy;
        vm.buyPolicy = buyPolicy;
        vm.signOut = signOut;
        vm.isSignIn = false;
        vm.userContracts = userContracts;
        vm.viewClaims = viewClaims;
        vm.viewC = false;
        vm.fileClaimForm = fileClaimForm;
        vm.fileC = false;
        vm.claimFile = claimFile;

        // function implementations
        _init();

        function _init() {

        	// is user loggedIn
			if($rootScope.userEmail === undefined) {
            	$state.go("app.user");
            }

            getActivePolicy();
            userContracts();

            vm.isSignIn = true;
        }

        function signOut() {
        	$rootScope.userEmail = '';

        	toastr.success('user signout successfully');
        	vm.isSignIn = false;
        	$state.go("app.user");
        }

        function getActivePolicy() {
            var url = '/api/user/activePolicyList';

            userHomeService.getActivePolicy(url)
                .then(function (response) {
                    vm.activePolicy = angular.fromJson(response.data);
                    console.log('activePolicy : ', response.data);
                }, function (error) {
                    console.log(error);
                });
        }

        function buyPolicy(isValid, policyDetails){
        	console.log(isValid);
        	console.log(policyDetails);
        	
        	console.log('Login user :' + $rootScope.userEmail );

        	if (isValid) {
        		var url = '/api/user/createContract/policyuuid/'+policyDetails.purchased+'/username/'+$rootScope.userEmail+'/password/test';

	        	userHomeService.buyPolicy(url)
	                .then(function (response) {
	                    console.log(response);

	                    if(response.status === 200 ) {
							toastr.success(response.data,'Policy purchased successfully');		

							// 
							userContracts();					
                        }

	                }, function (error) {
	                    console.log(error);
	                });
            }
        }
    
        function userContracts() {
        	var url = '/api/user/contractList/username/'+$rootScope.userEmail;

            userHomeService.userContracts(url)
                .then(function (response) {
                    
                    vm.purchasedPolicyContracts = angular.fromJson(response.data);
                    console.log('purchase policy contracts : ', response.data);

                }, function (error) {
                    console.log(error);
                });
        }

        function viewClaims(contract){
        	vm.viewC = true;
        	vm.fileC = false;

        	// contract.uuid	
        	var url = '/api/user/contractList/username/'+$rootScope.userEmail;

            userHomeService.userContracts(url)
                .then(function (response) {
                    
                    vm.contractClaimRequests = angular.fromJson(response.data[0].claims);
                    
                    var count = response.data.length;
                    for(var i=0;i<count;i++){

                    	// view claims for clicke contracts
                    	if(response.data[i].uuid === contract.uuid) {
                    		// set variable if all okay
                    		vm.contractClaimRequests = response.data[i].claims;
                    		break;
                    	}
                    }

                    console.log(response.data.length);
                    // console.log(response.data[0].claims.length);

                    // console.log(response.data[0].claims);
                    // console.log(response.data[0].uuid);
                    // console.log(contract.uuid);
                    
                }, function (error) {
                    console.log(error);
                });
        }

        function fileClaimForm(contract){
        	vm.viewC = false;
        	vm.fileC = true;

        	console.log(contract);

        	vm.contractuuid = contract.uuid;
        }

        function claimFile(isValid, claimDetils, contractuuId) {
        	
        	if(claimDetils.isTheft === undefined ) {
                claimDetils.isTheft = false;
            }
        	
        	console.log(isValid);
        	console.log(claimDetils);
        	console.log(contractuuId);

        	if(isValid){

        		var url = '/api/user/claimFile/contractuuid/'+contractuuId+'/description/'+claimDetils.description+'/isTheft/'+claimDetils.isTheft;

        		userHomeService.fileClaim(url)
                .then(function (response) {
                    
                    if(response.status === 200 ) {
                        toastr.success(response.data,'Claim has been filed successfully.');

                        vm.fileC=false;
                    }

                }, function (error) {
                    console.log(error);
                });
        	}
        }
    }

})();