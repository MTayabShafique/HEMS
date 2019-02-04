// -----------------Mongoose Connection---------------------
var mongodb = require("mongodb");
var mongoose = require('mongoose');
mongoose.Promise= global.Promise;
var dburl = 'mongodb://tayab:1234@ds233769.mlab.com:33769/hems';
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
   
    console.log('Mongoose disconnected through ' + ' ' + msg);
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

var dbObject;


var MongoClient = mongodb.MongoClient;


MongoClient.connect(dburl, function(err, db){
  if ( err ) throw err;
  dbObject = db;
});
//-----------defining schema path for mongoose-------------
require('./api/data/User_schema.js');
require('./api/data/Appliance_Schema.js');

//-----------Defining diff modules and routes for Api--------------

var express = require('express');
var app = express();
var path= require('path');
var uncaught = require('uncaught');
var Serialport = require('serialport');
var bodyparser=require('body-parser');
var portName = 'COM6';
var routes = require('./api/routes');

app.set('port', 3000);

uncaught.start();
uncaught.addListener(function (error)

{

  console.log('Uncaught error or rejection: ', error.message);

});

//---------------Storing Sensor Data to Mongodb via mongoose server-----------------

const Readline = Serialport.parsers.Readline;

var port = new Serialport(portName, 

{

  baudRate: 9600

});

const parser = new Readline();

port.pipe(parser);

var Sensor_Schema = mongoose.Schema            //sensor_data schema

({
    room_no: [{type:String, "default":''}],
    current:[{type:String, "default":''}],
    power: [{type:String,  "default":''}],
    time:{type : Date,     "default": Date.now} 
}, 

{

    versionKey: false

});


var SensorData = mongoose.model('Sensor', Sensor_Schema);

parser.on('data', function (data) 

{
    var item = new SensorData();
    var date = new Date();

    obj = JSON.parse(data)
        
        var consumption = [];
        var roomsensor = {};
        var roomsensor1 = {};

        var amps = parseFloat(obj.Sensor0, 10);        //sending sensor data to mongodb  for room1 appliance
        roomsensor.room_no = "1";
        roomsensor.current = amps;
        roomsensor.power = amps * 220;
        roomsensor.time = date;
        consumption.push(roomsensor)
        
        var amps1 = parseFloat(obj.Sensor1, 10);       //sending sensor data to mongodb for room2 appliance
        roomsensor1.room_no = "2";
        roomsensor1.current = amps1;
        roomsensor1.power = amps1 * 220;
        roomsensor1.time = date;
        consumption.push(roomsensor1)
        
        SensorData.collection.insert(consumption,function (err, docs) 

        {
          if (err)
         { 
           
            return console.error(err);
          
          }
        
        });
});

app.get('/list', function (req, res) 

{

    SensorData.find({ }, '-_id', function (err, docs) 

    {
        res.json(docs);
    
    }).sort({_id: -1});

});
//-----------------------------------------------------------getting data from mongodb--------------------------
function getData(res){
  var energy = {
    room0 : [],
    room1 : [],
    dates : []
  };
  
  var consump = dbObject.collection("sensors");
  consump.aggregate([{$group :{_id: "$room_no", energyarr: {$push: "$power"} , dates : {$push: { $dateToString: { format: "%Y-%m-%d", date: "$time" } }}, currentarr : {$push:'$current'}}}])
  .toArray(function(err,data){
    res
    .status(200)
    .json(data)
  });
}


function getData1(responseObj){

  dbObject.collection("sensors").find({}).toArray(function(err, docs){
    if ( err ) throw err;
    var timeArray = [];
    var Current = [];
    var Power=[];

    for ( index in docs){
      var doc = docs[index];
      
      var time = doc['time'];
   
      var current = doc['current'];
  
      var power = doc['power'];

      timeArray.push({"label": time});
      Current.push({"value" : current});
      Power.push({"value" : power});
    }

    var dataset = 
    [
      {
        "seriesname" : "Current value(A)",
        "data" : Current
      },

      {
        "seriesname" : "Power value(W)",
        "data": Power
      },

      {
    
        "seriesname" : "Time",
        "data" : timeArray
      }      
     
    ];

    var response = 
    {

      "dataset" : dataset,
      "categories" : timeArray
    
    };

    responseObj.json(response);

  });

}


function getDataRoom1(res){
  var energy = {
    room0 : [],
    room1 : [],
    dates : []
  };
  
  var consump = dbObject.collection("sensors");
  consump.aggregate([{ $match: { room_no: "1" } },{$group :{_id: "$room_no", energyarr: {$push: "$power"} ,
   dates : {$push: { $dateToString: { format: "%Y-%m-%d", date: "$time" } }}, currentarr : {$push:'$current'}}}])
  .toArray(function(err,data){-
    res
    .status(200)
    .json(data)
  });
}

function getDataRoom11(responseObj){

  dbObject.collection("sensors").find({room_no:"1"}).toArray(function(err, docs){
    if ( err ) throw err;
    var timeArray = [];
    var Current = [];
    var Power=[];

    for ( index in docs)

    {
      
      var doc = docs[index];
      
      var time = doc['time'];
   
      var current = doc['current'];
  
      var power = doc['power'];

      timeArray.push({"label": time});
      Current.push({"value" : current});
      Power.push({"value" : power});
    }

    var dataset = 
    [

      {
        "seriesname" : "Current value(A)",
        "data" : Current
      },

      {
        "seriesname" : "Power value(W)",
        "data": Power
      },      

      {
    
        "seriesname" : "Time",
        "data" : timeArray
      }  

    ];

    var response = 
    {

      "dataset" : dataset,
      "categories" : timeArray
    
    };

    responseObj.json(response);

  });

}

function getDataRoom2(res){
  
  var energy = {
    room0 : [],
    room1 : [],
    dates : []
  };
  
  var consump = dbObject.collection("sensors");
  consump.aggregate([{ $match: { room_no: "2" } },{$group :{_id: "$room_no", energyarr: {$push: "$power"} , 
  dates : {$push: { $dateToString: { format: "%Y-%m-%d", date: "$time" } }}, currentarr : {$push:'$current'}}}])
  .toArray(function(err,data){-
    res
    .status(200)
    .json(data)
  });

}
function getDataRoom21(responseObj) {
dbObject.collection("sensors").find({room_no:"2"}).toArray(function(err, docs){
    if ( err ) throw err;
    var timeArray = [];
    var Current = [];
    var Power=[];

    for ( index in docs)

    {

      var doc = docs[index];
      
      var time = doc['time'];
   
      var current = doc['current'];
  
      var power = doc['power'];

      
      timeArray.push({"label": time});
      Current.push({"value" : current});
      Power.push({"value" : power});

    }

    var dataset = [
      {
        "seriesname" : "Current value(A)",
        "data" : Current
      },

      {
        "seriesname" : "Power value(W)",
        "data": Power
      },     

      {
    
        "seriesname" : "Time",
        "data" : timeArray
      }   
     
    ];

    var response = {
      "dataset" : dataset,
      "categories" : timeArray
    };
    responseObj.json(response);
  });
}




//----------------------Setting Hems MeanStack Api Paths------------

app.use(function(req,res,next)

{
	console.log(req.method, req.url);
	next();

});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/assets', express.static((__dirname + '/assets')));

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use('/api', routes);

app.get("/sensor0", function(req, res){
  getData(res);
});

app.get("/sensor0.1", function(req, res){
  getData1(res);
});

app.get("/sensor1", function(req, res){
  getDataRoom1(res);
});

app.get("/sensor1.1", function(req, res){
  getDataRoom11(res);
});

app.get("/sensor2", function(req, res){
  getDataRoom2(res);
});
app.get("/sensor2.1", function(req, res){
 getDataRoom21(res);
});

var server= app.listen(app.get('port'), function()

{
	
	var port = server.address().port;
	console.log(" Iam at Port:" + " " + port);
	
	
});

