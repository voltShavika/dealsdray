const mongoose = require("mongoose");


const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    number:{
        type:Number,
        require:true

    },
    designation: {
        type: String,
        require: true
    },
    course: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    image:{
        type:String,
        require:true
    }
    
},{
    timestamps:true
})


const Employee = mongoose.model('t_employee', employeeSchema)

module.exports = Employee;