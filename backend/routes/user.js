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
            message: 'Incorrect Inputs'
        })
    }

    const exisingUser = await User.findOne({
        username: username
    })

    if(exisingUser){
        res.status(411).json({
            message: 'Email already Taken',
        })
    }

    const user = await User.create({
        username,
        firstName,
        lastName,
        password,
    })

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const userId = user._id;
    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.status(201).json({ message: "User created successfully", token: token })

})

const signingBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(8)
})

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const { success } = signingBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }

    const user = User.findOne({
        username: username,
        password: password,
    })

    if(user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)

        res.status(200).json({
            message: "User logged in successfully",
            token: token
        })
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional()
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    const { password, firstname, lastname } = req.body;

    if(!success){
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }

    await User.updateOne({
        _id: req.userId
    }, {
        password: password,
        firstname: firstname,
        lastname: lastname
    })
    
    res.status(200).json({
        message: "Updates Successfully"
    })
})

router.get('/bulk', authMiddleware, async (req, res) => {
    const filter = req.params.filter || "";

    if(!filter){
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }

    const users = await User.find({
        $or: [{
            firstName: {
                $regex: filter,
            }
        }, {
            lastName: {
                $regex: filter,
            }
        }]
    })

    return res.status(200).json({
        user: users.map((user) => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })

})

module.exports = router;    