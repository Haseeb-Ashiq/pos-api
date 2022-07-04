const Products = require('../models/product');

exports.Product=Object.create({
    Register: async (req,res) => {
        const {name,price,description,slug,qty,catagory,productPictures}=req.body;
        const pro=new Products({
            name,
            price,description,
            slug,
            qty,
            catagory,
            productPictures:req.files.map((p)=> {
                return {img:p.filename }
            })
        });
        await pro.save((_error,_pro)=>{
            if(_error) return res.status(400).json(_error);
            if(_pro) return res.status(201).json({_pro});
    })
    },
    Update:async(req,res)=>{
        const {id}=req.params;
        await Products.findByIdAndUpdate(id,{...req.body},{new:true})
        .exec( async (_error,_pro) => {
            if(_error) return await res.status(400).json(_error);
            if(_pro) return await res.status(200).json({_updatedProduct:_pro});
        })

    },
    GetProducts: async (req,res) => {
       let _pro= await Products.find()
        .select('_id name price qty description productPictures catagory')
        .populate({path:'catagory',select:'_id name'})
        .exec()
     return res.status(200).json({_pro})
    },
    GetProductById:async(req,res)=>{
        await Products.find({catagory:req.params.id})
        .exec( async (_error,_pro) => {
            if(_error) return await res.status(400).json(_error);
            if(_pro) return await res.status(200).json({_pro});
        })
    },
    Delete:async (req,res)=>{
        await Products.findByIdAndDelete({_id:req.params.id})
        .exec( async (_error,_pro) => {
            if(_error) return await res.status(400).json(_error);
            if(_pro) return await res.status(200).json({message:'deleted successfull'});
        })
    }
})