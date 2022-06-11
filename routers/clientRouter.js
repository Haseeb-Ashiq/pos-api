const { Client } = require("../controllers/clientController");

const router=require("express").Router();

router.post('/client/register',Client.Register);
router.get('/client/getclients',Client.GetClients);
router.get('/client/getclient/:id',Client.GetClient);
router.patch('/client/updateclient/:id',Client.UpdateClient);
module.exports=router;