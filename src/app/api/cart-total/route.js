import mongoose from "mongoose";
import {CartTotal} from "../../model/TotalCart"


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

export async function POST(req) {
    const data = await req.json();
    const CartItemDoc = await CartTotal.create(data);
    return Response.json(CartItemDoc);
  }



export async function PUT(req) {
    const data = await req.json();
    const {_id,TotalMrp,Discount,Total } = data;
     console.log(data);
     const updatedCart = await CartTotal.findByIdAndUpdate(_id, { TotalMrp, Discount, Total }, { new: true });
     return new Response(JSON.stringify(updatedCart), { status: 200 });
    }

    export async function GET() {
        return Response.json(
            await CartTotal.find()
        )
        
    }