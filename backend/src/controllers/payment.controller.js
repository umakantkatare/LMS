import {
  createOrderService,
  getPaymentsService,
  verifyPaymentService,
} from "../services/payment.service.js";

const getRazorpayApiKey = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    next(error);
  }
};

const buySubscription = async (req, res, next) => {
  try {
    const order = await createOrderService(req.user.id);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

const verifySubscription = async (req, res, next) => {
  try {
    const payment = await verifyPaymentService(req.body);
    res.status(200).json({
      success: true,
      message: "payment verified",
      payment,
    });
  } catch (error) {
    next(error);
  }
};
const allPayments = async (req, res, next) => {
  try {
    const payments = await getPaymentsService();
    res.status(200).json({
      success: true,
      payments: payments
    });
  } catch (error) {
    next(error);
  }
};

export { getRazorpayApiKey, buySubscription, verifySubscription, allPayments };
