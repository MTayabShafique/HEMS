angular.module('HEMS').controller('ApplianceListController', ApplianceListController);


function ApplianceListController($http)

{

   var x=this;

   var refresh=function()

	{

	  $http.get('/api/Appliance').success(function(response)

	    {
	    	console.log("i got the Appliance Id");
	    	x.Appliance=response;
	        x.app=" ";


	    });

    };


 refresh();

   $http.get('/api/Appliance').then(function(response)

   {

      x.Appliance=response.data;

   });


   x.remove=function(id)

   {

   	console.log(id);

   	$http.delete("/api/Appliance/" + id).success(function(response)

   	{
        
            refresh();

   	});

   };

}