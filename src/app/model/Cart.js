import { Schema,model,models } from "mongoose";

const CartScheme = new Schema ({
    
    Name: { type: String, required: true },
    image: { type: String, required: true },
    DiscountPrice: { type: Number, required: true },
    Baseprice: { type: Number, required: true },
    PercentageOFF: { type: Number, required: true },
    quantity: { type: Number,required: true  },
}, { timestamps: true }); 
export const Cart = models?.Cart || model('Cart', CartScheme);

