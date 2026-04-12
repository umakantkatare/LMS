import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import logger from "./utils/logger.util.js";
import userRoutes from "./routes/user.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import courseRoutes from "./routes/course.route.js";
import paymentRoutes from "./routes/payment.route.js";
import contactRouter from "./routes/contact.route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  morgan("dev", {
    stream: {
      write: (message) => {
        logger.info(message.trim());
      },
    },
  }),
);

app.use("/uploads", express.static("uploads"));
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1", contactRouter);

app.use((req, res) => {
  logger.warn(`404 - ${req.method} ${req.originalUrl}`);

  res.status(404).send("OOPS!! 404 PAGE NOT FOUND");
});

app.use(errorMiddleware);
export default app;
