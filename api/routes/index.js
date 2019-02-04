var express = require('express');
var router = express.Router();

var ctrluser= require('../controllers/user.controllers.js');
var ctrlapp= require('../controllers/Appliance.controllers.js');

   router                         // for User's
  .route('/User/Signup')
  .post(ctrluser.Signup);

  router
  .route('/User/Login')
  .post(ctrluser.login);

  router
  .route('/update_pass')
  .post(ctrluser.Update_Pass)
  .get(function (req,res) 
    {

      res
        .status(200)
        .json('working')
        
    });

  router
  .route('/Appliance')              // For Appliance's
  .get(ctrluser.authenticate,ctrlapp.ApplianceGetAll)
  .post(ctrluser.authenticate,ctrlapp.ApplianceAddOne);
  
  router
  .route('/Appliance/:AppId')
  .get(ctrlapp.ApplianceGetone)
  //.put(ctrlapp.ApplianceUpdateOne)
  .delete(ctrlapp.ApplianceDeleteOne);

  

module.exports = router;