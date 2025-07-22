import express from "express";
import { razorpay } from "../helper/razorpay_setup.js";
import shortUUID from "short-uuid";

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

export default router;
