import { Schema,model,models } from "mongoose";

const CategorySchema = new Schema ({
    name: { type: String, required: true }
}, {timeseries :true}); 
export const Category = models?.Category ||  model('Category', CategorySchema); 