const Clients =require('../models/client');
const { User } = require('./userController');

exports.Client=Object.create({
    Register:async (req,res) =>{
                try {
            const { fullname,email,password} = req.body;
            console.log({fullname,email,password})
            console.log(req.file)
            const client=new Clients({
                fullname,
                email,
                password,
                empPic:req.file.filename
            });
            await client.save( async (_error,_client)=>{
                if(_error) return await res.status(400).json({_error});
                if(_client) return await res.status(201).json({_client:_client});
            })
        } catch (error) {
            return await res.status(500).json({error});
        }
    },
    Login: async( req,res)=>{
        try {
           
            const {email,password} = req.body;
            await Clients.findOne({email:email})
            .exec((_error,_client)=>{
                if(_error) return res.status(400).json(_error);
                if(_client)
                {
                    if(_client.password===password)
                    {
                        return res.status(200).json({_client:_client});
                    }
                    else{
                        return res.status(200).json({_client:'password not matching'});
                    }
                }
            })

        } catch (error) {
            return await res.status(500).json({error:error.message})
        }
    },
    GetClient: async (req,res) => {
        try {
            await Clients.findById({_id:req.body.params})
            .exec(async (_client,_error)=>{
                if(_error) return await res.status(400).json({_error});
                if(_client) return await res.status(200).json({_client});
            })
        } catch (error) {
            return await res.status(500).json({error});
        }
    },
    GetClients: async (req,res) => {
        try {
            await Clients.find()
            .exec( async (_client,_error) => {
                if(_error) return await res.status(400).json({_error});
                if(_client) return await res.status(200).json({_client});
            })
        } catch (error) {
            return await res.status(500).json({error});
        }
    },
    UpdateClient: async (req,res) => {
        try {
            const { firstName,lastName,phone,email,
                cnic,province,city,permanentAddress} = req.body;
            await Clients.findByIdAndUpdate({_id:req.body.params},
                {firstName,lastName,phone,email,cnic,province,city,permanentAddress},
                {new:true})
            .exec( async (_client,_error) => {
                if(_error) return await res.status(400).json({_error});
                if(_client) return await res.status(201).json({_updatedClient:_})
            })
        } catch (error) {
            return await res.status(500).json({error});
        }
    }
})