class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// utils/appError.js

// class AppError extends Error {
//   constructor(message, statusCode) {
//     super(message);

//     this.statusCode = statusCode;
//     this.success = false;

//     // fail = 4xx | error = 5xx
//     this.status = String(statusCode).startsWith("4") ? "fail" : "error";

//     this.isOperational = true;

//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// export { ApiError, AppError };

export default ApiError;
