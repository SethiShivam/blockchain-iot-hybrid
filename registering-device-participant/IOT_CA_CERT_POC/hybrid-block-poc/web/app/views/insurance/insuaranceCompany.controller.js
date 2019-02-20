(function () {
    'use strict';
    angular.module('insuaranceApp').controller('InsuaranceCompanyController', InsuaranceCompanyController)
    InsuaranceCompanyController.$inject = ['$scope', 'insuranceService','toastr'];

    function InsuaranceCompanyController($scope, insuranceService,toastr,$rootScope) {
        var vm = this;
        vm.activatePolicy = activatePolicy;
        vm.deActivatePolicy = deActivatePolicy;
        vm.savePolicy = savePolicy;
        vm.fetchActiveClaimConfirmedByPolice = fetchActiveClaimConfirmedByPolice;
        vm.viewReImburseFm = viewReImburseFm;
        vm.vreimburseForm = false;
        vm.reImburseAmount = reImburseAmount;
        vm.rejectClaimFinal = rejectClaimFinal;
        vm.processForRepairing = processForRepairing;

        _init();
        
        function _init() {
            getPolicyLists(true);
        }

        function fetchActiveClaimConfirmedByPolice(){
            getConfirmedClaims();
        }

        function getConfirmedClaims(){
            
            var url = '/api/insurance/claimLists';

            insuranceService.getPolicyLists(url)
                .then(function (response) {

                    vm.confirmedClaimsByPolice = angular.fromJson(response.data);

                    //if(_displayToaster) {
                        //toastr.success('Policies retrieved successfully.');
                    //}

                }, function (error) {
                    console.log(error);
                });
        }

        function processForRepairing(claimDetails){
            // url
            var url = '/api/insurance/repaireClaim/fileclaimuuid/'+claimDetails.uuid+'/contractuuid/'+claimDetails.contract_uuid;

            insuranceService.processForRepairing(url)
                .then(function (response) {
                    console.log(response);
                    if(response.status === 200 ) {
                        toastr.success(response.data,'Claim Repairing process completed successfully.');
                        vm.vreimburseForm = false;
                        getConfirmedClaims();
                    }

                }, function (error) {
                    console.log(error);
                });   
        }

        function viewReImburseFm(claimDetails){
            vm.vreimburseForm = true;

            vm.claimId =  claimDetails.uuid;
            vm.contractuuId =  claimDetails.contract_uuid;
            vm.claimDate =  claimDetails.date;
            vm.claimDesc =  claimDetails.description;
            vm.isThefT =  claimDetails.is_theft;
            vm.fileRef =  claimDetails.file_reference;
        }

        function reImburseAmount(isValid, reimburseDetails, paramClaimId, paramContractClaimId){

            if(isValid) {
                
                var url = '/api/insurance/reImburseClaim/fileclaimuuid/'+paramClaimId+'/contractuuid/'+paramContractClaimId+'/reimbursable/'+reimburseDetails.amount;
                console.log(url);
                
                insuranceService.reimburseAmount(url)
                .then(function (response) {
                    console.log(response);
                    if(response.status === 200 ) {
                        toastr.success(response.data,'Claim amount reimbursed successfully.');
                        vm.vreimburseForm = false;
                        getConfirmedClaims();
                    }

                }, function (error) {
                    console.log(error);
                });
            }
            
            
        }

        function rejectClaimFinal(claimDetails){
            // 
            var url = '/api/insurance/rejectClaim/fileclaimuuid/'+claimDetails.uuid+'/contractuuid/'+claimDetails.contract_uuid;
            
            insuranceService.rejectClaim(url)
                .then(function (response) {
                    console.log(response);
                    if(response.status === 200 ) {
                        toastr.success(response.data,'Claim rejected successfully.');
                        getConfirmedClaims();
                    }

                }, function (error) {
                    console.log(error);
                });  
        }

        function getPolicyLists(_displayToaster) {
            var url = '/api/insurance/policy/all/active/true/deactive/true';

            insuranceService.getPolicyLists(url)
                .then(function (response) {
                    vm.policies = angular.fromJson(response.data);

                    if(_displayToaster) {
                    	toastr.success('Policies retrieved successfully.');
                    }

                }, function (error) {
                    console.log(error);
                });
        }

        function activatePolicy(policyDetails){
			console.log(policyDetails);
			
			var url = '/api/insurance/policy/status/uuid/'+policyDetails.uuid+'/active/true';

			insuranceService.activatePolicy(url)
                .then(function (response) {
                    console.log('Active policy response :', response);

                    if(response.status === 200 ) {
                    	toastr.success(response.data,'Policy Activated');
                    	getPolicyLists(false);
                    }
                }, function (error) {
                    console.log(error);
                });
        }

        function deActivatePolicy(policyDetails){
			console.log(policyDetails);
			
			var url = '/api/insurance/policy/status/uuid/'+policyDetails.uuid+'/active/false';

			insuranceService.deActivatePolicy(url)
                .then(function (response) {
                    console.log('De Active policy response :', response);

                    if(response.status === 200 ) {
                    	toastr.success(response.data,'Policy DeActivated');
                    	getPolicyLists(false);
                    }

                }, function (error) {
                    console.log(error);
                });
        }

        function savePolicy(frmPolicy, policyData){

            if (frmPolicy.$valid) {
                console.log(policyData.theftInsured);

                if(policyData.theftInsured === undefined ) {
                    policyData.theftInsured = false;
                }

            var url = '/api/insurance/policy/add/formula_per_day/'+policyData.formulaPerDay+'/max_sum_insured/'+policyData.maximumSumInsured+'/theft_insured/'+policyData.theftInsured+'/description/'+policyData.description+'/conditions/'+policyData.condition+'/active/false/min_duration_days/'+policyData.minimumDurationDays+'/max_duration_days/'+policyData.maximumDurationDays;
            
            insuranceService.savePolicy(url)
                .then(function (response) {
                    console.log(response);

                    if(response.status === 200 ) {
                        toastr.success(response.data,'Policy added successfully.');

                        policyData.formulaPerDay = '';
                        policyData.maximumSumInsured = '';
                        policyData.theftInsured = false;
                        policyData.description = '';
                        policyData.condition = '';
                        policyData.minimumDurationDays = '';
                        policyData.maximumDurationDays = '';

                        frmPolicy.$setPristine();

                        getPolicyLists(false);
                        
                    }

                }, function (error) {
                    console.log(error);
                });

            }
        }

    }

})();