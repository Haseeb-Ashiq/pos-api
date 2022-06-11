const Cart=require('../models/cart');

exports.Cart=Object.create({
AddToCart:async (req,res) =>{
    const {customer,orderNo}=req.body;
    // const cartitems=
    // console.log({
    //     customer,orderNo,cartItems
    // })
    console.log(req.body)
    const cart=new Cart({
        customer,
        orderNo,
        cartItems:req.body.cartItems.map(item=>{
            return {product:item.product,qty:item.qtys,price:item.price}
   })
    });

    await cart.save((error,_order)=>{
              if(error) return res.status(400).json({msg:error.message})
              if(_order) return res.status(201).json({_order})
    })
},

GetOrders:async (req,res) => {
     await Cart.find()
     .exec((error,_order)=>{
        if(error) return res.status(400).json({msg:error.message})
        if(_order) return res.status(200).json({_order})
     })
},
GetOrder:async (req,res) => {
    await Cart.findOne({orderNo:req.params.order_no})
    .exec((error,_order)=>{
        if(error) return res.status(400).json({msg:error.message})
              if(_order) return res.status(200).json({_order})
    })
}


})