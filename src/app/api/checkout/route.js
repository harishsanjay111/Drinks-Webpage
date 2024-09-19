import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authoptions } from "../auth/[...nextauth]/route";
import { Order } from "@/app/model/Order";
const stripe = require('stripe')(process.env.STRIPE_SK)
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

export async function POST(req) {
  const { TotalMrp,Address,cartproducts } = await req.json();
  const TotalPrice = TotalMrp / 74.83;
  const session = await getServerSession(authoptions);
  const userEmail = session?.user?.email;
  const OrderDoc = await Order.create({
    userEmail,
    ...Address, 
    cartproducts,
    TotalPrice,
    paid: false,
  });
const stripeLineItems = [];
  console.log(stripeLineItems);
for (const product of cartproducts) {
const productName = product.Name;
stripeLineItems.push({
    quantity : product.quantity,
    price_data : {
        currency : 'USD',
        product_data : {
            name : productName, 
        },
        unit_amount : Math.round(TotalPrice * 100),
    }
})
}


  
  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: 'payment',
    customer_email: userEmail,
    success_url: process.env.NEXT_AUTH + 'Orders/' +  OrderDoc._id.toString() + '?clear-cart=1',
    cancel_url: process.env.NEXT_AUTH + 'Cart?cancelled=1',
    metadata: { orderId: OrderDoc._id.toString() },
    payment_intent_data : {
      metadata : { orderId: OrderDoc._id.toString() },
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: 'Delivery fee',
          type: 'fixed_amount',
          fixed_amount: { amount: 0, currency: 'USD' },
        },
      },
    ],
  });

  // Redirect the user to the Stripe payment page
  return Response.json(stripeSession.url)
}
