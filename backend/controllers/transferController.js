const mongoose = require('mongoose')
const User = require('../models/userModel')
const Transaction = require('../models/transactionModel')

//transfer money
const transferMoney = async (req, res) => {
    const { receiverEmail, amount } = req.body
    const senderId = req.user._id   // coming from requireAuth

    if (!receiverEmail || !amount) {
        return res.status(400).json({ error: 'All fields are required' })
    }

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const sender = await User.findById(senderId).session(session)
        if (!sender) throw new Error('Sender not found')

        const receiver = await User.findOne({ email: receiverEmail }).session(session)
        if (!receiver) throw new Error('Receiver not registered')

        if (sender._id.equals(receiver._id)) {
            throw new Error('Cannot send money to yourself')
        }

        if (sender.balance < amount) {
            throw new Error('Insufficient balance')
        }

        if (sender.email === receiver.email) {
            return res.status(400).json({ error: "Cannot send money to yourself" })
        }

        if (amount <= 0) {
            return res.status(400).json({ error: "Amount must be greater than zero" })
        }


        sender.balance -= amount
        receiver.balance += amount

        await sender.save({ session })
        await receiver.save({ session })

        await Transaction.create(
            [{
                senderId: sender._id,
                receiverId: receiver._id,
                amount,
                status: 'SUCCESS'
            }],
            { session }
        )

        await session.commitTransaction()
        session.endSession()

        res.status(200).json({
            message: 'Transfer successful',
            senderBalance: sender.balance
        })

    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        res.status(400).json({ error: error.message })
    }
}

//get transactions for a user
const getUserTransactions = async (req, res) => {
  const userId = req.user._id

  const transactions = await Transaction.find({
    $or: [{ senderId: userId }, { receiverId: userId }]
  })
    .sort({ createdAt: -1 })
    .populate('senderId', 'name email')
    .populate('receiverId', 'name email')

  res.status(200).json(transactions)
}

module.exports = {
    transferMoney,
    getUserTransactions
}