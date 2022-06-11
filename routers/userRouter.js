const { User } = require('../controllers/userController');

const router=require('express').Router();

router.post('/user/register',User.Register);
router.post('/user/login',User.Login);
module.exports=router;