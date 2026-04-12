
import transporter from './../configs/email.config.js';

const sendEmail = async ({ email, subject, message, html }) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject,
    text: message,
    html, // optional
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;