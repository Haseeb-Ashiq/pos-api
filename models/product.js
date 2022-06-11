const mongoose = require('mongoose');
const productSchema=new mongoose.Schema({
    name:{type:String,trim:true},
    price:{type:Number},
    description:{type:String},
    slug:{type:String,unique:true},
    qty:{type:Number,required:true},
    catagory:{type:mongoose.Schema.Types.ObjectId,ref:'Catagories'},
    productPictures:[{
        img:{type:String}
    }]
});
module.exports=mongoose.model('Products',productSchema);