import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file"; // optional

// 🎨 Custom colors
winston.addColors({
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue",
});

const logger = winston.createLogger({
  level: "info",

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(), 
  ),

  transports: [
    new winston.transports.File({
      filename: "logs/combined.log",
    }),

    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),


    new DailyRotateFile({
      filename: "logs/app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ all: true }), // ✅ enable colors
        winston.format.timestamp({ format: "HH:mm:ss" }),
        winston.format.printf(({ timestamp, level, message, stack }) => {
          return `${timestamp} [${level}]: ${stack || message}`;
        }),
      ),
    }),
  );
}

export default logger;
