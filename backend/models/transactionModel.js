const mongoose = require('mongoose')

const Schema= mongoose.Schema

const transactionSchema = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    status: {
        type: String,
        enum: ['SUCCESS', 'FAILED'],
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Transaction', transactionSchema)