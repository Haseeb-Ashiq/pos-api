const jwt=require('jsonwebtoken');
const Clients=require('../models/client');
const dotenv=require('dotenv');
dotenv.config();
exports.ClientLoginAuth=(req,res,next)=>{
     let token;
    const {authorization}=req.headers;
    if(authorization)
    {
        token=authorization.split(' ')[1];
        const {userID}=jwt.verify(token,process.env.secret_key_jwt)
       if(userID)
       {
           req.user_id=userID;
        next()
       }
       else{
           res.send({'status':'400','msg':'un authorize'})
       }
    }
    else{
        res.send({'status':'500','msg':'token required'})
    }

}