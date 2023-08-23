import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }
  const { name, email, city, postalCode, streetAddress, country, cart } =
    req.body;

  await mongooseConnect();

  let line_items = [];

  for (const product of cart) {
    if (product.quantity > 0) {
      line_items.push({
        quantity: product.quantity,
        price_data: {
          currency: "USD",
          product_data: { name: product.title },
          unit_amount: product.price * 100,
        },
      });
    }
  }

  const session = await getServerSession(req, res, authOptions);

  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
    userEmail: session?.user?.email,
  });

  const stripeSession = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString(), test: "ok" },
  });

  res.json({
    url: stripeSession.url,
  });
}
