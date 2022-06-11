const mongoose=require('mongoose');
const cartSchema=new mongoose.Schema({
    customer:{type:String},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'Users'},
    orderNo:{type:String},
    cartItems:[
        {
            product:{type:mongoose.Schema.Types.ObjectId,ref:'Products'},
            qty:{type:Number,default:1},
            price:{type:Number}
        }
    ]
},
{
    timestamps:true
});

module.exports=mongoose.model('Cart',cartSchema);
