const { Employee } = require("../controllers/employeController");

const router=require("express").Router();

router.post('/employee/register',Employee.Register);
router.get('/employee/getemployee',Employee.GetEmployee);
router.get('/employee/getemployees/',Employee.GetEmployees);
module.exports=router;