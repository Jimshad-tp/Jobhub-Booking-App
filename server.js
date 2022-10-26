
require('dotenv').config()
const express = require('express')
const app = express()
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const dbConfig = require ("./confiq/dbConfig")
app.use(express.json())

app.use('/api/user',userRoute)
app.use('/api/admin',adminRoute)
const port = process.env.PORT || 5000

app.listen(port, () => console.log(` node server started at port  ${port}`))