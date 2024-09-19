import mongoose from "mongoose";
import {Cart} from '../../model/Cart'

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });


export async function POST(req) {
  const data = await req.json();
  const CartItemDoc = await Cart.create(data);
  return Response.json(CartItemDoc);
}


export async function PUT(req) {
const data = await req.json();
const {_id,quantity } = data;
 console.log(_id,quantity);
await Cart.findByIdAndUpdate(_id,{quantity});
return Response.json(true);
}
  
  export async function GET() {
    return Response.json(
        await Cart.find()
    )
    
}
export async function DELETE(req) {
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  console.log(_id);
  await Cart.deleteOne({_id});
  return Response.json(true);
  
}