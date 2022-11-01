const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin: {
        type:Boolean,
        default:false,
        required:true
    },
 status:{
    type:String,
    default:'Active'
 }
},{timestamps:true})

module.exports = mongoose.model("Users",userSchema)
