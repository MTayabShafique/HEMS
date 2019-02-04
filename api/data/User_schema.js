var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User_Schema=new Schema
({

      username : {type:String, unique:true, required:true,"default":' '},
      email    : {type:String, required:true, "default":' '},
      password : {type:String, required:true, min:6, max:10, "default":' '}

  },

  { usePushEach: true },

  {versionKey: false });



mongoose.model("user",User_Schema);