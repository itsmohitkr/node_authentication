require("dotenv").config();
const nodemailer = require("nodemailer");
console.log("Email Username:", process.env.EMAIL_USERNAME);
console.log("Email Password:", process.env.EMAIL_PASSWORD);
const transporter = nodemailer.createTransport({
    
    
service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME, // Your Gmail address
    pass: process.env.EMAIL_PASSWORD, // Your Gmail password or app-specific password
  },
});

function sendResetEmail(email, resetToken) {
  console.log("called");

  const resetLink = `http://localhost:5001/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USERNAME, // Sender address
    to: email, // Recipient's email address
    subject: "Password Reset Request",
    text: `You requested a password reset. Please use the following link to reset your password: ${resetLink}`,
    html: `<p>You requested a password reset. Please use the following link to reset your password:</p>
               <a href="${resetLink}">Reset Your Password</a>`,
  };

  // Send the email
  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  transporter.sendMail(mailOptions, (error, info) => {
    console.log(mailOptions);

    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

module.exports = {
  sendResetEmail,
};
