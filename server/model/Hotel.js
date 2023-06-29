import mongoose from "mongoose";
import {Schema, model} from 'mongoose';



const HotelSchema = new Schema({
    
    name: String
})



export default HotelSchema;