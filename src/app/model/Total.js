import { Schema,model,models } from "mongoose";
const TotalSchema = new Schema({
    TotalBaseMrp : {type : Number, default : 0},
    Discount : {type : Number,default : 0},
    TotalMRP :  {type : Number,default : 0},
},{timestamps : true},{defaults:true});
export const TotalMRP = models.Total || model('TotalMRP',TotalSchema)