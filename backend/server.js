require('dotenv').config()

const cors = require('cors');

const express = require('express')
const mongoose = require('mongoose')
const transferRoutes = require('./routes/transferRoutes')
const authRoutes = require('./routes/authRoutes')

//express app
const app=express()
app.use(cors());

//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api', authRoutes)
app.use('/api', transferRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
        console.log("Connected to DB & Listening on port")
})

    })
    .catch((error) => {
        console.log(error)
    })
