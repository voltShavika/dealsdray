const express = require("express");
const Admin = require('../models/TLogin.model.js');
const bcrypt = require('bcryptjs');
const router = express.Router();

const saltrounds = 10;


router.post("/signup",async (req,res,next)=>{
    try{
        const hash = await bcrypt.hash(req.body.password,saltrounds);
        const admin = new Admin({
            name:req.body.name,
            password:hash
        })
         admin.save((err)=>{
            if(err){
                next({code: 400, msg: "admin exits"})
            }
            else{
               return res.status(201).json(admin);
            }

        })

    }
    catch(e){
        next({msg: e.stack})

    }

});


router.post("/login", async(req,res,next)=>{
    try{
        const admin = await Admin.findOne({name:req.body.name})
        if(!admin){
            next({code: 400, msg: "admin doesnt exits"})
        }else{
            const hash = await bcrypt.compare(req.body.password,admin.password)
            if(hash){
                res.status(200).json(admin);
            }else{
                next({code: 400, msg: "password doesnt match"})
            }
        }

    }
    catch(e){
        next({msg: e.stack})

    }

})

module.exports = router;


