var mongoose= require('mongoose');
var Appliance_Model= new mongoose.Schema
({

    ApplianceName:
 {
     type:String , required:true,  "default":' '
 }

},

{

    versionKey: false

});

mongoose.model("appliance",Appliance_Model,"Appliance");

