const Cart=require('../models/cart');

exports.Cart=Object.create({
AddToCart:async (req,res) =>{
    const {customerName,orderNo,customer_id,paymentMethod,deliveryAddress}=req.body;
    const cart=new Cart({
        customerName,
        orderNo,
        client:customer_id,
        paymentMethod,
        deliveryAddress,
        cartItems:req.body.cartItems.map(item=>{
            return {
                product_id:item._id,
                product_name:item.name,
                product_img:item.img,
                qty:item.qtys,
                price:item.price
            }
   })
    });

    await cart.save((error,_order)=>{
              if(error) return res.status(400).json({msg:error.message})
              if(_order) return res.status(201).json({_order})
    })
},

OrderStatusUpdate:async (req,res) => {
           const {id}=req.params;
           await Cart.findByIdAndUpdate({_id:id},{...req.body},{new:true})
           .populate({path:'client',select:'_id fullname empPic email phone'})
           .exec( async (_error,_order) => {
            if(_error) return await res.status(400).json(_error);
            if(_order) return await res.status(200).json({_updatedOrder:_order});
        })
},

GetOrders:async (req,res) => {
     await Cart.find()
     .select('_id customerName client orderNo paymentMethod deliveryAddress status cartItems')
     .populate({path:'client',select:'_id fullname email phone empPic'})
     .exec((error,_order)=>{
        if(error) return res.status(400).json({msg:error.message})
        if(_order) return res.status(200).json({_order})
     })
},
GetOrder:async (req,res) => {
    await Cart.findOne({orderNo:req.params.order_no})
    .select('_id customerName client orderNo paymentMethod deliveryAddress cartItems')
    .populate({path:'client',select:'_id fullname empPic'})
    .exec((error,_order)=>{
        if(error) return res.status(400).json({msg:error.message})
              if(_order) return res.status(200).json({_order})
    })
}


})