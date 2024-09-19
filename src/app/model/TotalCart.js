import { Schema,model,models } from "mongoose";

const TotalCartScheme = new Schema ({
    
    
    TotalMrp: { type: Number, required: true },
    Discount: { type: Number, required: true },
    Total: { type: Number, required: true },
    
}, { timestamps: true},{defaults:true}); 
export const CartTotal = models?.CartTotal || model('CartTotal', TotalCartScheme);

