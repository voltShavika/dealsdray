const express = require("express");
const multer = require("multer")
const {v4 : uuidv4} = require('uuid')
const {checkSchema, validationResult} = require("express-validator");
const Employee = require('../models/TEmployee.model.js');
const router = express.Router();

const DIR = './public/'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const filename = uuidv4() + "" + file.originalname.toLowerCase().split(' ').join('')
        cb(null, filename)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/png"){
            cb(null, true);
        } else{
            cb(null, false);
            return cb("Only .jpg .jpeg or .png are supported");
        }
    }
})

const uploadSingleFile = upload.single("image");


router.get("/", async(req,res,next)=>{
    try{
        var employees = await Employee.find({})
        res.status(200).json(employees);
    }
    catch(e){
     next({msg: e.stack});
 
    }
 });

const EmpAddSchema = {
    name: {
        notEmpty: true,
        errorMessage: "Name cannot be empty"
    },
    email: {
        isEmail: true,
        errorMessage: "Email should be valid"
    },
    number: {
        isMobilePhone: true,
        errorMessage: "Number should be valid"
    },
    designation: {
        isIn: {
            options: [["HR", "Manager", "Sales"]],
            errorMessage: "Designation should HR, Manager Or Sales"
        }   
    },
    course: {
        isIn: {
            options: [["BCA", "MCA", "BSC"]],
            errorMessage: "Course should be BSC, BCA, MCA"
        }
    },
    gender: {
        isIn: {
            options: [["M", "F"]],
            errorMessage: "Gender should be M or F"
        }
    }
}

router.post("/add",  async(req, res , next)=>{
    try{
        uploadSingleFile(req, res, async (ferr) => {
            let errors = []
            if(ferr){
                errors.push({msg: ferr})
            }
            else{
                if(!req.hasOwnProperty("file")){
                    errors.push({msg: "Photo cannot be blank"})
                }
            }
            await Promise.all(checkSchema(EmpAddSchema).map(chain => chain.run(req)));
            errors = errors.concat(validationResult(req).array());
            if(errors.length > 0){
                next({code: 400, msg: "Validation Error", errors: errors.map(e => e.msg)})
                return;
            }
            const url = req.protocol + '://' + req.get('host')
            const employee = new Employee({
                name: req.body.name,
                email: req.body.email,
                number: req.body.number,
                designation: req.body.designation,
                course: req.body.course,
                gender: req.body.gender,
                image: url + '/public/' + req.file.filename
            })
            employee.save((err)=>{
                if(err){
                    next({code:400, msg: "Validation Error", errors: ["Employee already exists"]})
                }else{
                    res.status(200).json(employee)
                    return;
                }
            })
        })
    }
    catch(e){
        next({msg: e.stack});
    }
});


router.post("/edit/:id",  async (req,res, next)=>{
    try {
        uploadSingleFile(req, res, async (ferr) => {
            let errors = []
            if(ferr){
                errors.push({msg: ferr})
            }
            await Promise.all(checkSchema(EmpAddSchema).map(chain => chain.run(req)));
            errors = errors.concat(validationResult(req).array());
            const employee = await Employee.findOne({_id:req.params.id})
            
            if(req.body.email != employee.email){
                const temp = await Employee.find({email: req.body.email})
                if(temp.length > 0){
                    errors.push({msg: "Email already exists"})
                }
            }
            if(errors.length > 0){
                next({code: 400, msg: "Validation Errors", errors: errors.map(e => e.msg)})
                return;
            }
            const url = req.protocol + '://' + req.get('host')
            employee.name = req.body.name
            employee.number = req.body.number
            employee.email = req.body.email
            employee.designation = req.body.designation
            employee.course = req.body.course
            employee.gender = req.body.gender
            employee.image = req.hasOwnProperty("file")? url + '/public/' + req.file.filename: employee.image
            
            employee.save((err)=>{
                if(!err){
                    res.status(200).json(employee)
                }
                else{
                    next({code:400, msg: "Employee cannt be updated"})
                }

            })
        })
    }
    catch(e){
        next({msg: e.stack});

    }

})
module.exports = router;