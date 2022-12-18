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
         employee.save((err)=>{
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

router.post("/edit/:id",async (req,res,next)=>{
    try{
        const employee = await Employee.findOne({_id:req.params.id})
        employee.name = req.body.name
        employee.number = req.body.number
        employee.email = req.body.email
        employee.designation = req.body.designation
        employee.course = req.body.course
        employee.gender = req.body.gender
        employee.image = req.body.image
        
        employee.save((err)=>{
            if(!err){
                res.status(200).json(employee)
            }
            else{
                next({code:400,msg:"employee cannt be updated"})
            }

        })


    }
    catch(e){
        next({msg: e.stack});

    }

})
module.exports = router;