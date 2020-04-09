const sgMail = require('@sendgrid/mail');

const sendEmailProd = async (options) => {
  const setApi = sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    // text: options.message,
    html: options.message
  };

  const info = await sgMail.send(message);
  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmailProd;