import express from "express";
import { submitContact } from "../controllers/contact.controller.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/contact", isLoggedIn, authorizedRoles("USER"), submitContact);

export default router;
