import { Schema, models, model } from "mongoose";

const UserInfoSchema = new Schema({
    image : { type : String},
    email: { type: String, required: true },
    phone :{   type : String, },
    streetAddress: { type: String },
    Postalcode: { type: String }, 
    City: { type: String },
    Country: { type: String },
    admin: { type: Boolean, default: false },   
    
}, { timestamps: true });

export const UserInfo = models.UserInfo || model('UserInfo', UserInfoSchema);
