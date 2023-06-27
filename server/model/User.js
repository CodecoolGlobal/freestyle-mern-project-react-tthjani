import mongoose from "mongoose";
import {Schema, model} from 'mongoose';



const userSchema = new Schema({
    officialName: String,
    username: String,
    email: String,
    phone: String,
    hashedPassword: String ,     
})


const User = model('user', userSchema);

export default User;