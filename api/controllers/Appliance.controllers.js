var mongoose= require('mongoose');
var appliance= mongoose.model('appliance');

module.exports.ApplianceGetAll= function(req, res)

{

	  console.log("Get All Appliance's");
    console.log(req.query);

	  var offset = 0;
	  var count = 6;
	  var max=15;
	
	  if (req.query && req.query.offset) 

    {

		  offset = parseInt(req.query.offset, 10);

	  }
	  
	  if (req.query && req.query.count) 

    {

		  count = parseInt(req.query.count, 10);

	  }

	  if (isNaN(offset)|| isNaN(count))

	  {

	  	res
	  	 .status(400)
	  	 .json({'message':'Enter Number for offset and count'});
	  	 return;

	  }

	  if(count>max)

	  {
       res
       .status(400)
	  	 .json({'Caution':'Count limit of'+' '+max});
       return;
	  }
	
    appliance
    .find()
    .skip(offset)
    .limit(count)
    .exec(function(err,Appliance)

    {
      if(err)

      {
          console.log("Error Finding Appliance's")
          res
          .json(Appliance);

      }

      else

      {

        console.log("Find Appliance's", Appliance.length);  // call back function
        res
       .json(Appliance); // send user through response

      }

    });
};

module.exports.ApplianceGetone= function(req, res)

{
  	var AppId= req.params.AppId;
  	console.log('GET ApplianceID', AppId);
  	appliance
  	.findById(AppId) 
  	.exec(function(err, doc)

	{
		 var response=

		{

			status:200,
			message:doc

		}

		if(err)

      {
          console.log('Error Finding Appliance.')
          response.status=500;
          response.message=err;

      }

      else if(!doc)

      {
         response.status=404;
         response.message={'Caution':'Appliance ID not Found'};

      }
         res
         .status(response.status)
         .json(response.message);

	});

};

module.exports.ApplianceAddOne = function(req, res) 

{

  var ApplianceName= req.body.ApplianceName
	appliance
	.create
  
  ({
      ApplianceName: ApplianceName
       
       }, function(err,appliance)        //appliance is new document for storing data in HEMS database in mongodb
     
       {
          if(err)

          {
          	console.log("Error Creating new Appliance");
          	res
          	.status(400)
          	.json(err);
          }

          else

          {
          	console.log("New Appliance is created");
          	res
          	.status(201)
          	.json(appliance);

          }
	
  });

};


module.exports.ApplianceUpdateOne= function(req,res)

{

  var AppId= req.params.AppId;
  console.log('GET ApplianceID', AppId);
  appliance
  .findById(AppId) 
  .exec(function(err, doc)

  {

      var response=

      {

        status:200,
        message:doc

      }

     if(err)

      {
          console.log('Error Finding Appliance.')
          response.status=500;
          response.message=err;

      }

      else if(!doc)

      {
         response.status=404;
         response.message={'Caution':'Appliance ID not Found'};

      }

      if(response.status!==200)

      {
         res
         .status(response.status)
         .json(response.message);
      }

      else

      {
         doc.ApplianceName=req.body.ApplianceName;
         doc.save(function(err,ApplianceUpdated)

         {
          
          if(err)

          {
           
            res
            .status(500)
            .json(err);

          }

           else

           {

                res
                .status(204)
                .json();
                
           }


         });
      }
        
  });

};


module.exports.ApplianceDeleteOne= function(req,res)

{

    var AppId= req.params.AppId;
    appliance
    .deleteOne({_id : AppId})
    .exec(function(err,appliance)

    {

      if(err)

      {

        res 
        .status(404)
        .json(err);

      }

      else

      {
        console.log("Appliance Deleted, ID: ", AppId)
        res
        .status(204)
        .json();

      }

   });

};