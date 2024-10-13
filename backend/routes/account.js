require('dotenv').config();
const express = require('express')
const { authMiddleware } = require('../middleware/middleware')
const { Account } = require('../db/db')
const router = express.Router();
const mongoose = require('mongoose');

const zod = require("zod");

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

const transferBody = zod.object({
    amount: zod.number().positive(),
    recipientId: zod.string(),

})

router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { success } = transferBody.safeParse(req.body);
    
    if(!success) {
        return res.status(411).json({
            message: "Invalid Inputs"
        })
    }

    const { amount, recipientId } = req.body;
    const senderId = req.userId;

    try{
        const senderAcc = await Account.findOne({senderId: senderId}).session(session)
        const recipientAcc = await Account.findOne({userId: recipientId}).session(session)
        
        if(!senderAcc || senderAcc.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient Balance or Invalid Sender"
            })
        }

        if(!recipientAcc){
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid Recipient"
            })
        }

        await Account.updateOne({
            userId: senderId
        }, {
            $inc: {
                balance: -amount
            }
        }).session(session)

        await Account.updateOne({
            userId: recipientId
        }, {
            $inc: {
                balance: amount
            }
        }).session(session)

        session.commitTransaction();

        return res.status(200).json({
            message: "Transfer Successful"
        })
        
    }
    catch(error){
        await session.abortTransaction();
        console.log(error);
        throw error;
    }
    finally{
        session.endSession();
    }
})

module.exports = router;