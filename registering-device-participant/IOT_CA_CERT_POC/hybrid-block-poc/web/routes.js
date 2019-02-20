//SPDX-License-Identifier: Apache-2.0

var insurance = require('./controller.js');

var multer = require('multer');

var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

module.exports = function(app){

  // TEMP
   // IPFS
   app.post('/api/temprature',function(req, res){
    console.log('-----------------');
    console.log(req.body.lat);

    //res.send('asdfd');
    insurance.store_temprature(req, res);
  });

  // GET QUERY INFO
  app.get('/api/temprature', function(req, res){
    insurance.get_tempratures(req, res);
  });

  /// Testing  
  // IPFS
  app.post('/api/upload/name/:names',upload.single('reportFile'),function(req, res){
    insurance.upload_file(req, res);
  });
  // GET QUERY INFO
  app.get('/api/block', function(req, res){
    insurance.get_block(req, res);
  });
  // IPFS JS -1
  // It's very crucial that the file name matches the name attribute in your html
  app.post('/api/upload/fir', upload.single('fir'), function(req, res){
         
        console.log(req.file);
        // console.log(req.body);

        

        // res.json('success');
  });


  /// INSURANCE
  // Get Policy
  app.get('/api/insurance/policy/all/active/:active/deactive/:deactive', function(req, res){
    insurance.policy_list(req, res);
  });

  // Add Policy
  app.get('/api/insurance/policy/add/formula_per_day/:formula_per_day/max_sum_insured/:max_sum_insured/theft_insured/:theft_insured/description/:description/conditions/:conditions/active/:active/min_duration_days/:min_duration_days/max_duration_days/:max_duration_days', function(req, res){
    insurance.add_policy(req, res);
  });

  // Set Policy Status
  app.get('/api/insurance/policy/status/uuid/:uuid/active/:active', function(req, res){
    insurance.set_status_policy(req, res);
  });

  // User Registration
  app.get('/api/user/registerUser/username/:username/password/:password/first_name/:first_name/last_name/:last_name', function(req, res){
    insurance.register_user(req, res);
  });
  
  // User Authentication
  app.get('/api/user/authentication/username/:username/password/:password', function(req, res){
    insurance.user_authentication(req, res);
  });

  // All users
  app.get('/api/user/all', function(req, res){
    insurance.fetch_users(req, res);
  });

  // List Active policy
  app.get('/api/user/activePolicyList', function(req, res){
    insurance.active_policy_list(req, res);
  });

  //  Purchase policy / Policy contract generated
  app.get('/api/user/createContract/policyuuid/:policyuuid/username/:username/password/:password', function(req, res){
    insurance.create_policy_contract(req, res);
  });

  // Contract Lists
  app.get('/api/user/contractList/username/:username', function(req, res){
    insurance.contract_list(req, res);
  });

  // File claim
  app.get('/api/user/claimFile/contractuuid/:contractuuid/description/:description/isTheft/:isTheft', function(req, res){
    insurance.file_claim(req, res);
  });

  // Insurance company authentication
  app.get('/api/insurance/authentication/username/:username/password/:password', function(req, res){
    insurance.insurance_admin_authentication(req, res);
  });

  /// POLICIA
          // Policia authentications
          app.get('/api/police/authentication/username/:username/password/:password', function(req, res){
            insurance.police_admin_authentication(req, res);
          });

          // List Theft
          app.get('/api/police/theftClaimList', function(req, res){
            insurance.police_theft_claim_lists(req, res);
          });

          // Approve claim police
          app.post('/api/police/approveClaim/fileclaimuuid/:fileclaimuuid/contractuuid/:contractuuid/isTheft/:isTheft', upload.single('fir'), function(req, res){
            insurance.police_approve_claim(req, res);
          });

          // Reject claim police
          app.get('/api/police/rejectClaim/fileclaimuuid/:fileclaimuuid/contractuuid/:contractuuid', function(req, res){
            insurance.police_reject_claim(req, res);
          });

  // Insurance claim list
  // All New Claim 

          // List all claims approved by police
          app.get('/api/insurance/claimLists', function(req, res){
            insurance.insurance_claim_lists(req, res);
          });

          // Insurance rejected claim
          app.get('/api/insurance/rejectClaim/fileclaimuuid/:fileclaimuuid/contractuuid/:contractuuid', function(req, res){
            insurance.police_reject_claim(req, res);
          });

          // ReImbursement
          app.get('/api/insurance/reImburseClaim/fileclaimuuid/:fileclaimuuid/contractuuid/:contractuuid/reimbursable/:reimbursable', function(req, res){
            insurance.insurance_reimburse_claim(req, res);
          });  
          
          // Process for Repair
          app.get('/api/insurance/repaireClaim/fileclaimuuid/:fileclaimuuid/contractuuid/:contractuuid', function(req, res){
            insurance.insurace_repair_process(req, res);
          });

        // Service center
        // Service center authentications
        app.get('/api/service/authentication/username/:username/password/:password', function(req, res){
          insurance.service_center_admin_authentication(req, res);
        });

        // List all repair orderss
        app.get('/api/service/repairOrderLists', function(req, res){
          insurance.repair_orders(req, res);
        });

        // Mark as complete repair order
        app.get('/api/service/completeWorkOrder/fileclaimuuid/:fileclaimuuid', function(req, res){
          insurance.mark_complete_repair_order(req, res);
        });   

}
