const mongoose = require("mongoose");
const clientScheme=new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    phone:{type:String,unique:true},
    email:{type:String},
    cnic:{type:String,unique:true},
    province:{type:String},
    city:{type:String},
    permanentAddress:{type:String},
    empPic:{type:String}
});
module.exports=mongoose.model("Clients",clientScheme);