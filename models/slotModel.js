const mongoose = require('mongoose')

const slotSchema = new mongoose.Schema({
    section:{
        type:String,
        required:true,
    },
    no:{
        type:Number,
        required:true,
        unique:true
    },
   
    status: {
        type:String,
        default:'available',
       
    },
 appplicationId:{
    type:mongoose.Types.ObjectId,
    ref:'Application'
 }
},{timestamps:true})

module.exports = mongoose.model("Slots",slotSchema)
