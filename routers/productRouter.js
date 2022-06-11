const router=require('express').Router();
const multer=require('multer');
const path=require('path');
const { Product } = require('../controllers/productController');
const storage=multer.diskStorage({
    destination:function(req,file,cb)
    {
          cb(null,'./uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,file.filename+'-'+Date.now()+path.extname(file.originalname))
    }
});

const upload = multer({
 storage:storage
}).array('myImage',10);

router.post('/product/register',upload,Product.Register);
router.get('/product/getproducts',Product.GetProducts);
router.get('/product/getproductbyid/:id',Product.GetProductById);
router.patch('/product/productupdate/:id',Product.Update);
module.exports=router;