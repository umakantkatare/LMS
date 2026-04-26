import Razorpay from "razorpay";

if (!process.env.RAZORPAY_KEY_ID) {
  console.log("razor pay key not defined");
}
if (!process.env.RAZORPAY_KEY_SECRET) {
  console.log("razor pay secret not defined");
}

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
