import JWT from "jsonwebtoken";
import crypto from "crypto";

const generateToken = (payload) => {
  return JWT.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

const generatePasswordResetToken = () => {
  const resetToken = crypto.randomBytes(20).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const expireTime = Date.now() + 10 * 60 * 1000;
  return {
    resetToken,
    hashedToken,
    expireTime,
  };
};
export { generateToken, generatePasswordResetToken };
