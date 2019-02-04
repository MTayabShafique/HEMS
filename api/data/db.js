/*
var mongoose = require('mongoose');
mongoose.Promise= global.Promise;
var dburl = 'mongodb://localhost:27017/HEMS';
var retry = null;
mongoose.connect(dburl);
mongoose.connection.on('connected', function() 

{

  console.log('Mongoose connected to :' + ' ' +  dburl);

});

mongoose.connection.on('error', function(err) 

{

  console.log('Mongoose connection error: ' + ' ' + err);

});

mongoose.connection.on('disconnected', function() 

{
 
  console.log('Mongoose disconnected');

});

function gracefulShutdown(msg, callback) 

{
 
  mongoose.connection.close(function() 
    
  {
   
    console.log('Mongoose disconnected through ' + ' ' +msg);
    callback();
  
  });


}

process.on('SIGINT', function() 
  
{
    gracefulShutdown('App termination (SIGINT)', function() 

    {
    
      process.exit(0);
  
  });


});
require('./api/data/User_schema.js');
require('./api/data/Appliance_Schema.js');

*/