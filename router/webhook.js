import express from "express";
const router = express.Router();
import crypto from "crypto";

router.post("/webhook", (req, res) => {
  const webhookBody = req.body;

  const webhookSignature = req.get("X_Razorpay-Signature");
  const webhookEventId = req.get("X-Raxorpay-Event-Id");
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  //   order_id, payment_id,webhookeventId

  //   if (
  //     !validateWebhookSignature(
  //       JSON.stringify(webhookBody),
  //       webhookSignature,
  //       webhookSecret
  //     )
  //   ) {
  //     console.error("signature do not matched");
  //     return res.status(400);
  //   }
  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(body)
    .digest("hex");

  if (expectedSignature !== webhookSignature) {
    console.error("Signature mismatch");
    return res.status(400).send("Invalid signature");
  }

  console.log("Webhook verified and received");
  console.log("Webhook body:", webhookBody);

  console.log("webhook body", webhookBody);
  const event = webhookBody.event;
  const paymentId = webhookBody.payload.payment.entity.id;

  const orderId = webhookBody.payload.payment.entity.order_id;
  const id = webhookBody.payload.payment.entity.notes.id;
  const receipt = webhookBody.payload.payment.entity.notes.receipt;

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
