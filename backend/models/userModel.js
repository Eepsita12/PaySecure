const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema= new Schema ({
    name: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required:true,
        default: 1000,
        min: 0
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})
 
module.exports= mongoose.model('User',userSchema)