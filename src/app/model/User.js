
import  { Schema, models, model } from "mongoose";


const UserSchema = new Schema({ 
  name : {type: String},
  LastName : {type: String, required: true},

    email : {type: String, required: true,  unique:true},
password :{
    type : String,
   
} ,



}, {timestamps :true});

  const User = models?.User || model('User',UserSchema);
export default User