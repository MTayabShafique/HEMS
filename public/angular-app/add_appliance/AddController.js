angular.module('HEMS').controller('AddController', AddController);


function AddController($http)

{

   var x = this;

   x.add=function()

   {

      var applianceinfo={

        ApplianceName: x.ApplianceName

      };

      if(!x.ApplianceName)

	     {

	  	   x.error='Please Enter a Appliance Name.';

	     }

       else

       {

         $http.post('http://localhost:3000/api/Appliance', applianceinfo).then(function(result)

         {

            console.log(result);
            x.message='Successfully Added Appliance.';
            x.error='';
            

         }).catch(function(error)

            {

            	console.log(error);

            });
       }

   }

};