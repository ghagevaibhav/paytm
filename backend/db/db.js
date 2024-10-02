const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const ObjectId = Schema.ObjectId;

try{
    mongoose.connect("mongodb+srv://admin:oMeyMiDShQNaLpUT@cluster0.cdutnom.mongodb.net/");
}
catch(error){
    console.log("Error connecting to the database: ", error);
}

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 20
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    firstName: {
        type: String,
        required: true,
        trimL: true,
        maxLength: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20
    }
})

const accountSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true,
    },
})

const User = model('user', userSchema);
const Account = model('account', accountSchema);

module.exports = {
    User,
    Account
}