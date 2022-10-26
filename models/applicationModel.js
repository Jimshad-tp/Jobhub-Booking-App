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
    companyname: {
        type: String
    },

    Problem: {
        type: String
    },
    uniqueSolution: {
        type: String
    },
    status: {
        type: String,
        default: "Submitted"
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },


}, { timestamps: true })

module.exports = mongoose.model("Application", applicationSchema)