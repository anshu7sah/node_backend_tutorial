import express from "express";
import { razorpay } from "../helper/razorpay_setup.js";
import shortUUID from "short-uuid";
import { stripe } from "../helper/stripe_setup.js";

const router = express.Router();

router.post("/create-order", async (req, res) => {
  console.log("1");
  try {
    const receipt = shortUUID().new();

    const data = await razorpay.orders.create({
      amount: 100,
      currency: "INR",
      receipt,
      // payment_capture: 1,
    });

    return res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
});

// products.map(p=>{
//   return {
//     price_data:{
//       currency:"inr",
//       product_data:{
//         name:p.name
//       },
//       unit_amount:p.price
//     }
//   }
// })

router.post("/create-checkout-session", async (req, res) => {
  // const products=req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "toy",
              images: [
                "https://img.freepik.com/premium-photo/toys-kids-play-time-colorful-fun-composition_594847-3791.jpg?semt=ais_hybrid&w=740",
              ],
            },
            unit_amount: 10 * 100,
          },
          quantity: 10,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/failure",
    });

    return res.json({ url: session.id });
  } catch (error) {}
});

export default router;
