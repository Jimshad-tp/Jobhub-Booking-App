const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    subject: {
        type: String
    },

    qualification: {
        type: String
    },
    experience: {
        type: String
    },
    status: {
        type: String,
        default: "Pending"
    },
    slot: {
        type: mongoose.Types.ObjectId,
        ref: 'Slots'
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    },


}, { timestamps: true })

module.exports = mongoose.model("Application", applicationSchema)