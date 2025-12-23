const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

//register user
const registerUser = async (req,res) => {
    const {name, email, password, balance}= req.body

    if (balance !== undefined) {
        return res.status(400).json({error: 'Balance cannot be set during registration'})
    }

    if (!name || !email || !password) {
        return res.status(400).json({error: 'All fields are required'})
    }

    try{
        const existingUser= await User.findOne({email})
        if (existingUser){
            return res.status(400).json({error: 'Email already in use'})
        }

        //hash password
        const salt= await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const user=await User.create({
            name,
            email,
            password : hashedPassword,
            balance: 1000
        })

        res.status(201).json({
            message: 'User registered successfully',
            userId: user._id
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const loginUser = async (req,res) => {
    const {email, password}= req.body

    if (!email || !password) {
        return res.status(400).json({error: 'All fields are required'})
    }
    
    try{
        const user = await User.findOne({email})
        if (!user){
            return res.status(400).json({error: 'Invalid credentials'})
        }

        const match = await bcrypt.compare(password,user.password)
        if (!match) {
            return res.status(400).json({error: 'Invalid credentials'})
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn : '1d'}
        )

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                balance: user.balance
            }
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports= {
    registerUser,
    loginUser
}
































    