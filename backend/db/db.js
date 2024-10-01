const mongoose = require('mongoose');

const { Schema, model } = mongoose;

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

const User = model('user', userSchema);

export default User;