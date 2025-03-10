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

//tranfer money

router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance or invalid account"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid recipient account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    }); 
})

module.exports = router;