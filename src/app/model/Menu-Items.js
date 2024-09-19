import  { Schema, model, models } from "mongoose";
  

const MenuItemsSchema = new Schema({

    image : { type : String},
    Name : {type : String},
    Description : { type : String},
    Baseprice : { type : Number},
    DiscountPrice : { type : Number},
    PercentageOFF : {type : Number},
    TotalQuantity : {type : Number},
    quantity: { type: Number , default : 1},
    // category : {type : mongoose.Types.ObjectId},
    // Quantity : {type : [ExtraPricesSchema]},
    // ExtraIngredientPrices : {type : [ExtraPricesSchema]}
},{timestamps:true},{ defaults:true });
export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemsSchema);
 