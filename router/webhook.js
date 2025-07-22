import express from "express";
const router = express.Router();
import crypto from "crypto";
import dotenv from "dotenv";
import { razorpay } from "../helper/razorpay_setup.js";
dotenv.config();

router.all("/webhook", async (req, res) => {
  console.log("webhook started");
  const webhookBody = req.body;

  console.log("webhook body", webhookBody);

  // const webhookSignature = req.get("X_Razorpay-Signature");
  const webhookSignature = req.headers["x-razorpay-signature"];

  console.log("webhook signature", webhookSignature);
  const webhookEventId = req.headers["x-raxorpay-event-id"];

  console.log("webhook event id", webhookEventId);
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  //   order_id, payment_id,webhookeventId

  // if (
  //   !validateWebhookSignature(
  //     JSON.stringify(webhookBody),
  //     webhookSignature,
  //     webhookSecret
  //   )
  // ) {
  //   console.error("signature do not matched");
  //   return res.status(400);
  // }
  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(JSON.stringify(webhookBody))
    .digest("hex");

  if (expectedSignature !== webhookSignature) {
    console.error("Signature mismatch");
    return res.status(400).send("Invalid signature");
  }

  console.log("Webhook verified and received");
  console.log("Webhook body:", webhookBody);

  const event = webhookBody.event;
  const paymentId = webhookBody.payload.payment.entity.id;

  const orderId = webhookBody.payload.payment.entity.order_id;
  const id = webhookBody.payload.payment.entity.notes.id;
  const receipt = webhookBody.payload.payment.entity.notes.receipt;
  const amount = webhookBody.payload.payment.entity.amount;
  console.log("entity", webhookBody.payload.payment.entity);

  if (event === "payment.authorized") {
    const captured = await razorpay.payments.capture(paymentId, amount);
    console.log("✅ Payment captured:", captured.id);
    console.log("payment is authorized");
  }
  if (event === "payment.captured") {
    console.log("payment is successful");
    // await Order.findAndUpdata({receipt:receipt},{paid:true})
  }
  if (event === "payment.failed") {
    console.log("payment failed");
  }

  //   await Payment.create({
  //     paymentId,
  //     event,
  //     orderId,
  //     receipt
  //   })
});

export default router;
