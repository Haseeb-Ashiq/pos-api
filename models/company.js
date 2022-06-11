const mongoose=require('mongoose');
const companySchema=new mongoose.Schema({
name:{type:String},
companyId:{type:String,unique:true},
companyAddress:{type:String},
companyLogo:{type:String}
})
module.exports=mongoose.model('Company',companySchema);