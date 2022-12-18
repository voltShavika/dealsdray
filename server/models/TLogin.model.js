const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
})



const Admin = mongoose.model('t_login', AdminSchema)

module.exports = Admin;