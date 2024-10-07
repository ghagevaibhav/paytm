import express from 'express';
const router = express.Router();
import { authMiddleware } from '../middleware'
import mongoose from 'mongoose';
require('dotenv').config();

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

const transferBody = Zod.object({
    amount: Zod.number().positive(),
    recipientId: Zod.string(),

})

router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { amount, recipientId } = req.body;
    const senderId = req.userId;
    const { success } = transferBody.safeParse(req.body);

    if(!success) {
        return res.status(411).json({
            message: "Invalid Inputs"
        })
    }

    try{
        const senderAcc = await Account.findOne({senderId: senderId}).session(session)
        const recipientAcc = await Account.findOne({userId: recipientId}).session(session)
        
        if(!recipientAcc || !senderAcc || senderAcc.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient Balance or Invalid Recipient or Sender"
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

module.exports =  router;