const { Cart } = require('../controllers/cartController');

const router=require('express').Router();

router.post('/cart/addtocart',Cart.AddToCart);
router.get('/cart/getorders',Cart.GetOrders);
router.get('/cart/getorder/:order_no',Cart.GetOrder);
router.patch('/cart/orderstatusupdate/:id',Cart.OrderStatusUpdate);
module.exports=router;