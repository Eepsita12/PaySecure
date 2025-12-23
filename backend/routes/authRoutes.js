const express = require('express')
const{
    registerUser,
    loginUser
} = require('../controllers/authController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//transfer money
router.post('/auth/register', registerUser)

//get user transactions
router.post('/auth/login', loginUser)

router.get('/auth/me', requireAuth, (req, res) => {
  res.status(200).json({
    email: req.user.email,
    balance: req.user.balance,
  })
})


module.exports = router