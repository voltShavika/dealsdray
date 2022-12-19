const express = require("express");
const Admin = require('../models/TLogin.model.js');
const bcrypt = require('bcryptjs');
const {checkSchema, validationResult} = require("express-validator")
const router = express.Router();

const saltrounds = 10;

const LoginForm = {
    name: {
        notEmpty: true,
        errorMessage: "Username cannot be blank"
    },
    password: {
        notEmpty: true,
        errorMessage: "Password cannot be blank"
    }
}

router.post("/signup", checkSchema(LoginForm), async (req,res,next)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            next({code: 400, msg: "Error", errors: errors.array().map(e => e.msg)})
            return;
        }
        const hash = await bcrypt.hash(req.body.password,saltrounds);
        const admin = new Admin({
            name:req.body.name,
            password:hash
        })
         admin.save((err)=>{
            if(err){
                next({code: 400, msg: "Error", errors: ["Username already exists"]})
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


router.post("/login", checkSchema(LoginForm), async(req,res,next)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            next({code: 400, msg: "Error", errors: errors.array().map(e => e.msg)})
            return;
        }
        const admin = await Admin.findOne({name:req.body.name})
        if(!admin){
            next({code: 400, msg: "Error", errors: ["Username doesnt exists"]})
        }else{
            const hash = await bcrypt.compare(req.body.password,admin.password)
            if(hash){
                res.status(200).json(admin);
            }else{
                next({code: 400, msg: "Error", errors: ["Incorrect password"]})
            }
        }
    }
    catch(e){
        next({msg: e.stack})

    }

})

router.get("/dummy",async (req,res,next)=>{
    try{
        const hash = bcrypt.hash("Test@123",saltrounds)
        const admin = new Admin({
            name:"admin",
            password:hash
        })
        await admin.save();
        res.send({
            msg:"admin created"
        })

    }
    catch(e){
        next({msg: e.stack})

    }
   

})

module.exports = router;


