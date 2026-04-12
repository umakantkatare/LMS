export const resetPasswordTemplate = (resetUrl) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Password Reset</h2>
      <p>Click the button below to reset your password:</p>

      <a href="${resetUrl}" 
         style="
           display: inline-block;
           padding: 10px 20px;
           background-color: #4CAF50;
           color: #fff;
           text-decoration: none;
           border-radius: 5px;
           margin-top: 10px;
         ">
         Reset Password
      </a>

      <p style="margin-top: 20px;">
        This link will expire in <strong>10 minutes</strong>.
      </p>

      <p>If you did not request this, please ignore this email.</p>
    </div>
  `;
};