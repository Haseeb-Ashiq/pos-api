const user = require('../models/user');
const Users=require('../models/user');

exports.User=Object.create({
    Register:async(req,res)=>{
             const {firstName,lastName,userName,password}=req.body;
             const user=new Users({
                 firstName,
                 lastName,
                 userName,
                 password
             });
             console.log({
                firstName,
                lastName,
                userName,
                password
            })
             await user.save((_user,_error)=>{
                if(_error) return res.status(400).json({msg:_error.message});
                if(_user) return res.status(201).json({_user})
             })
    },
    Login:async(req,res)=>{
        try {
            
            const {userName}=req.body;
            // console.log({userName,password})
          await Users.findOne({userName:userName})
          .exec((_user,_error)=>{
               if(_error) return res.status(400).json({_error})
               if(_user) return res.status(200).json({_user:_user});
          })

        } catch (error) {
            return await res.status(500).json({error:error.message})
        }
    },
    Update:async (req,res)=>{
        const {id}=req.params;
        await Users.findByIdAndUpdate(id,req.body,{new:true})
        .exec((_error,_user)=>{
            if(_error) return res.status(400).json(_error)
            if(_user) return res.status(201).json({_updateuser:_user})
        })
    },
    Delete:async(req,res)=>{
        const {id}=req.params;
        await Users.findByIdAndDelete(id)
        .exec((_user,_error)=>{
            if(_error) return res.status(400).json(_error)
            if(_user) return res.status(201).json({_deleteduser:_user})
        })
    }
})