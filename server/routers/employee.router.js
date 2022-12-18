const express = require("express");
const Employee = require('../models/TEmployee.model.js');
const router = express.Router();



router.post("/add", async(req,res ,next)=>{
    try{
        const employee = new Employee({
            name:req.body.name,
            email:req.body.email,
            number:req.body.number,
            designation:req.body.designation,
            course:req.body.course,
            gender:req.body.gender,
            image:req.body.image
        })
        await employee.save((err)=>{
            if(err){
                next({code:400,msg:"employee already exists"})
            }else{
                res.status(200).json(employee)
                return;
            }

        })

    }
    catch(e){
        next({msg: e.stack});

    }

});

router.get("/display", async(req,res,next)=>{
   try{
    var employees = await Employee.find({})
    res.status(200).json(employees);


   }
   catch(e){
    next({msg: e.stack});

   }
});

module.exports = router;