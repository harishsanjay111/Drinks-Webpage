import mongoose from "mongoose";
import {TotalMRP} from '../../model/Total'

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL)
    const data = await req.json();
    const TotalDoc = await TotalMRP.create(data);
    return Response.json(TotalDoc);

}