const mongoose=require('mongoose');
const cartSchema=new mongoose.Schema({
    customerName:{type:String},
    client:{type:mongoose.Schema.Types.ObjectId,ref:'Clients'},
    orderNo:{type:String},
    paymentMethod:{type:String},
    deliveryAddress:{type:String},
    status:{type:String,default:'pending'},
    cartItems:[
        {
            product_id:{type:String},
            product_name:{type:String},
            product_img:{type:String},
            qty:{type:Number,default:1},
            price:{type:Number}
        }
    ]
},
{
    timestamps:true
});

module.exports=mongoose.model('Cart',cartSchema);
