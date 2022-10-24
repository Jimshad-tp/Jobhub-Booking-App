const { on } = require('events');
const { default: mongoose } = require('mongoose')
const mongooose = require ('mongoose')
const connect = mongoose.connect(process.env.MONGO_URL)
const connection = mongooose.connection;
connection.on('connected', () => {
    console.log('mongoDb is connected');
})
connection.on('error' , (error) => {
    console.log('Error in mongoose not connected' ,error);
})

module.exports = mongoose;