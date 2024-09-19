import mongoose from 'mongoose';
import {MenuItem} from '../../model/Menu-Items'
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
export async function POST(req) {
        const data = await req.json();
    const menuItemDoc = await MenuItem.create(data);
    return Response.json(menuItemDoc);

}

export async function PUT(req) {
    
    const {_id,quantity, ...data } = await req.json();
    await MenuItem.findByIdAndUpdate(_id,{quantity},data);
    return Response.json(true);




}
export async function GET() {
    return Response.json(
        await MenuItem.find()

    )
    
}
export async function DELETE(req) {
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    console.log(_id);
    await MenuItem.deleteOne({_id});    
    return Response.json(true);
    
}
