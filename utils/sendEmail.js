const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    // host: process.env.SMTP_HOST,
    // port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SENDGRID_USERNAME,
      // user: process.env.SMTP_EMAIL,
      pass: process.env.SENDGRID_PASSWORD
      // pass: process.env.SMTP_PASSWORD
    }
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    // text: options.message,
    html: options.message
  };

  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};


module.exports = sendEmail;