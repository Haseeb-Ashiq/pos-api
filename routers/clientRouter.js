const { Client } = require("../controllers/clientController");
const router=require("express").Router();
const path=require('path');
const multer=require('multer');
const { ClientLoginAuth } = require("../middleware/client-auth");
const storage=multer.diskStorage({
     destination:function(req,file,cb)
     {
         cb(null,'./uploads/')
     },
     filename:function(req,file,cb)
     {
        cb(null,file.filename+'-'+Date.now()+'-'+path.extname(file.originalname))
     }
})
const upload=multer({
    storage:storage,
}).single('clientPicture');
router.post('/client/register',upload,Client.Register);
router.get('/client/getclients',Client.GetClients);
router.post('/client/login',Client.Login);
router.get('/client/getclient/:id',Client.GetClient);
router.patch('/client/updateclient/:id',Client.UpdateClient);
router.patch('/client/activestatusupdate/:id',Client.ActiveStatusUpdate);
router.patch('/client/clientprofileupdate/:id',upload,Client.ClientProfileUpdate);
module.exports=router;