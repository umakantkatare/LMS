import { Router } from "express";
import {
  allPayments,
  buySubscription,
  getRazorpayApiKey,
  verifySubscription,
} from "../controllers/payment.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/key", isLoggedIn, getRazorpayApiKey);
router.post("/buy", isLoggedIn, buySubscription);
router.post("/verify", isLoggedIn, verifySubscription);
router.get("/all", isLoggedIn, allPayments);

export default router;
