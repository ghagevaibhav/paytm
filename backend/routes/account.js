import express from 'express';
const router = express.Router();
import { authMiddleware } from '../middleware'
import mongoose from 'mongoose';

// account routes 
router.get('/balance', authMiddleware , async (req, res) => {
    const userId = req.userId;

    const userAcc = await Account.findOne({
        userId: userId
    })

    return res.status(200).json({
        balance: userAcc.balance
    })

})

router.get('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    
})

module.exports =  router;