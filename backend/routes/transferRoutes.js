// API routes for money transfer and transaction history

const express = require('express')
const{
    transferMoney,
    getUserTransactions
} = require('../controllers/transferController')

const router = express.Router()

const requireAuth = require('../middleware/requireAuth')

//transfer money
router.post('/transfer', requireAuth, transferMoney)

//get user transactions
router.get('/transactions', requireAuth, getUserTransactions)

module.exports = router