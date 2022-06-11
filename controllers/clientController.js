const Clients =require('../models/client');
const { User } = require('./userController');

exports.Client=Object.create({
    Register:async (req,res) =>{
        try {
            const { firstName,lastName,phone,email,cnic,province,city,permanentAddress} = req.body;
            const client=new Clients({
                firstName,
                lastName,
                phone,
                email,
                cnic,
                province,
                city,
                permanentAddress
            });
            await client.save( async (_client,_error)=>{
                if(_error) return await res.status(400).json({_error});
                if(_client) return await res.status(201).json({message:"saved successfully"});
            })
        } catch (error) {
            return await res.status(500).json({error});
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