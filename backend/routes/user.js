const express = require('express')
const router = express.Router();
const User = require('../db/db.js')
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config.js')

const signupBody = zod.object({
    username: zod.string().email().min(3).max(20),
    firstName: zod.string().max(20),
    lastName: zod.string().max(20),
    password: zod.string().min(8)
}) 

router.post('/signup',async (req, res) => {
    const { username, firstName, lastName, password } = req.body;
    const { success } = signupBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: 'Email already Taken / Incorrect Inputs'
        })
    }

    const exisingUser = await User.findOne({
        username: username
    })

    if(exisingUser){
        res.status(411).json({
            message: 'Email already Taken / Incorrect Inputs',
        })
    }

    const user = new User({
        username,
        firstName,
        lastName,
        password
    })

    const userId = user._id;
    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    await newUser.save()

    res.status(201).json({ message: "User created successfully", token: token })

})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
})

module.exports = router;    