const Employees = require('../models/employee');

exports.Employee=Object.create({
    Register:async (req,res) =>{
        try {
            const { firstName,lastName,phone,email,cnic,province,city,permanentAddress,} = req.body;
            const emp=new Employees({
                firstName,
                lastName,
                phone,
                email,
                cnic,
                province,
                city,
                permanentAddress
            });
            await emp.save( async (_emp,_error)=>{
                if(_error) return await res.status(400).json({_error});
                if(_emp) return await res.status(201).json({message:"saved successfully"});
            })
        } catch (error) {
            return await res.status(500).json({error});
        }
    },
    GetEmployee: async (req,res) => {
        try {
            await Employees.findById({_id:req.body.params})
            .exec(async (_emp,_error)=>{
                if(_error) return await res.status(400).json({_error});
                if(_emp) return await res.status(200).json({_emp});
            })
        } catch (error) {
            return await res.status(500).json({error});
        }
    },
    GetEmployees: async (req,res) => {
        try {
            await Employees.find()
            .exec( async (_emp,_error) => {
                if(_error) return await res.status(400).json({_error});
                if(_emp) return await res.status(200).json({_emp});
            })
        } catch (error) {
            return await res.status(500).json({error});
        }
    },
    UpdateClient: async (req,res) => {
        try {
            const {id}=req.params;
            await Employees.findByIdAndUpdate(id,req.body,{new:true})
            .exec( async (_client,_error) => {
                if(_error) return await res.status(400).json({_error});
                if(_client)
                {
                    await find
                }
            })
        } catch (error) {
            return await res.status(500).json({error});
        }
    },
})