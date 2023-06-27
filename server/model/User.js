import mongoose from "mongoose";
import {Schema, model} from 'mongoose';

/* const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}; */

const userSchema = new Schema({
    officialName: String,
    username: String,
    email:/*  { */
        /* type: */ String,
        /* trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }, */
    phone: String,     //VALIDATE!!!!!!
    password: String ,     
})


const User = model('user', userSchema);

export default User;